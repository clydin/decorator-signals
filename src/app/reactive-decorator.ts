/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  ChangeDetectorRef,
  WritableSignal,
  effect,
  inject,
  signal,
  ɵNG_COMP_DEF,
} from '@angular/core';

const reactiveComponents = new WeakMap<object, WritableSignal<unknown>[]>();

export function Reactive<T extends object, V>(
  _target: ClassAccessorDecoratorTarget<T, V>,
  context: ClassAccessorDecoratorContext<T, V>
): ClassAccessorDecoratorResult<T, V> | void {
  if (context.kind !== 'accessor') {
    return;
  }

  let underlying: WritableSignal<V>;

  return {
    get() {
      return underlying();
    },
    set(value) {
      underlying.set(value);
    },
    init(value) {
      underlying = signal(value);

      const signals = reactiveComponents.get(this);
      if (signals) {
        signals.push(underlying);
      } else {
        reactiveComponents.set(this, [underlying]);
      }

      // No value needed here since it is accessed via the signal
      return undefined as unknown as V;
    },
  };
}

type ClassDecoratorFunction<
  Class extends new (...args: any) => any = new (...args: any) => any
> = (target: Class, context: ClassDecoratorContext<Class>) => Class | void;

export function ReactiveComponent<T extends new (...args: any) => any>(
  detach = true
): ClassDecoratorFunction<T> {
  return (target, context) => {
    context.addInitializer(function () {
      // Forward special Angular static properties to allow the framework to initialize the component.

      // @ts-ignore
      if (target[ɵNG_COMP_DEF]) {
        // @ts-ignore
        this[ɵNG_COMP_DEF] = target[ɵNG_COMP_DEF];
      }
      // @ts-ignore
      if (target['ɵfac']) {
        // @ts-ignore
        this['ɵfac'] = target['ɵfac'];
      }
    });

    return class extends target {
      constructor(...args: any[]) {
        super(...args);

        const signals = reactiveComponents.get(this);
        if (signals) {
          let callbackId: number | undefined;
          const changeDetector = inject(ChangeDetectorRef);

          if (detach) {
            changeDetector.detach();
            setTimeout(() => changeDetector.detectChanges(), 0);
          }
          effect((onCleanUp) => {
            signals.forEach((signal) => signal());
            if (callbackId === undefined) {
              callbackId = requestIdleCallback(
                () => {
                  callbackId = undefined;
                  changeDetector.detectChanges();
                },
                { timeout: 100 }
              );
              onCleanUp(
                () => callbackId !== undefined && cancelIdleCallback(callbackId)
              );
            }
          });
        }
      }
    };
  };
}

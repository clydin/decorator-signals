/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { WritableSignal, signal } from '@angular/core';

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

      // No value needed here since it is accessed via the signal
      return undefined as unknown as V;
    },
  };
}

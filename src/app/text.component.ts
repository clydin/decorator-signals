import { Component, Input, computed } from '@angular/core';
import { Reactive } from './reactive-decorator';

@Component({
  selector: 'app-text',
  standalone: true,
  template:`
    <h1>{{ text() }}</h1>
  `,
})
export class TextComponent {
  @Input()
  @Reactive
  accessor value = 'v17-reactive';

  text = computed(() => `Hello, ${this.value}`);
}

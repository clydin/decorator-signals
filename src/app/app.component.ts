import { Component } from '@angular/core';
import { Reactive } from './reactive-decorator';
import { TextComponent } from './text.component';

@Component({
  selector: 'app-root',
  imports: [TextComponent],
  standalone: true,
  template:`
    <app-text [value]="title"/>
    <p>Congratulations! Your app is running. 🎉</p>
    <button (click)="onClick()">CLICK ME</button>
  `,
})
export class AppComponent {

  @Reactive
  accessor title = 'v17-reactive';

  onClick() {
    this.title += '!';
  }
}

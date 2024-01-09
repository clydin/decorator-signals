import { Component } from '@angular/core';
import { ReactiveComponent, Reactive } from './reactive-decorator';

@Component({
  selector: 'app-root',
  standalone: true,
  template:`
    <h1>Hello, {{ title }}</h1>
    <p>Congratulations! Your app is running. 🎉</p>
    <button (click)="onClick()">CLICK ME</button>
  `,
})
@ReactiveComponent()
export class AppComponent {

  @Reactive
  accessor title = 'v17-reactive';

  onClick() {
    this.title += '!';
  }
}

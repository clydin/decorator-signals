import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveComponent, Reactive } from './reactive-decorator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
@ReactiveComponent()
export class AppComponent {

  @Reactive
  accessor title = 'v17-reactive';

  onClick() {
    this.title += '!';
  }
}

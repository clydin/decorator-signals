import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalComponent, reactive } from './reactive-decorator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
@SignalComponent()
export class AppComponent {

  @reactive
  accessor title = 'v17-reactive';

  onClick() {
    this.title += '!';
  }
}

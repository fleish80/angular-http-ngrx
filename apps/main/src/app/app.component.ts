import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'angular-http-ngrx-root',
  template: `
    <nav class="nav">
      <a href="/store-state-init">Store State Init</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .nav {
      display: flex;
      gap: 10px;
    }
  `],
  imports: [
    RouterOutlet
  ],
  standalone: true
})
export class AppComponent {
  title = 'main';
}

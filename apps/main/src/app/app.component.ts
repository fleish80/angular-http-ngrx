import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {RouterStore} from '@ngworker/router-component-store';
import {AsyncPipe, JsonPipe} from '@angular/common';

@Component({
  selector: 'angular-http-ngrx-root',
  template: `
    <nav class="nav">
      <a href="/store-state-init">Store State Init</a>
      <a href="/extra">Extra</a>
      <a href="/store-containment">Store Containment</a>
      <a href="/push-containment">Push Containment</a>
    </nav>


    <pre>{{routerStore.currentRoute$ | async | json}}</pre>

    <router-outlet></router-outlet>
  `,
  styles: [`
    .nav {
      display: flex;
      gap: 10px;
      padding-block-end: 10px;
    }
  `],
  imports: [
    RouterOutlet,
    AsyncPipe,
    JsonPipe
  ],
  standalone: true
})
export class AppComponent {

  routerStore = inject(RouterStore);

  title = 'main';
}

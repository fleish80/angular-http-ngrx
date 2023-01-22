import {Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {RouterStore} from '@ngworker/router-component-store';
import {AsyncPipe, JsonPipe} from '@angular/common';

@Component({
  selector: 'angular-http-ngrx-root',
  template: `
    <nav class="nav">
      <a routerLink="/store-state-init">Store State Init</a>
      <a routerLink="/extra">Extra</a>
      <a routerLink="/store-containment">Store Containment</a>
      <a routerLink="/push-containment">Push Containment</a>
      <a routerLink="/debounce-store">Debounce Store</a>
      <a routerLink="/switcher">Switcher</a>
      <a routerLink="/jsonp">Jsonp</a>
      <a routerLink="/async">Async Component Store</a>
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
    JsonPipe,
    RouterLink
  ],
  standalone: true
})
export class AppComponent {

  routerStore = inject(RouterStore);

  title = 'main';
}

import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';


@Component({
  selector: 'angular-standalone-switcher',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav class="nav">
      <a routerLink="on">ON</a>
      <a routerLink="off">OFF</a>
    </nav>
    <router-outlet></router-outlet>`,
  styles: [`
    .nav {
      display: flex;
      gap: 10px;
      padding-block-end: 10px;
    }
  `],
})
export class SwitcherComponent {

}

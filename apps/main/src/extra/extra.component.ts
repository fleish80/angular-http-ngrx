import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'angular-http-ngrx-extra',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="redirect()">Redirect with extra</button> `,
  styles: [],
})
export class ExtraComponent {

  private router = inject(Router);

  redirect() {
    this.router.navigate(['store-state-init'], {state: {extra: 'extra'}});
  }
}

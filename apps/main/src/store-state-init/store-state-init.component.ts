import {Component, inject} from '@angular/core';
import {provideComponentStore} from '@ngrx/component-store';
import {StoreStateInitService} from './store-state-init.service';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {PushModule} from '@ngrx/component';

@Component({
  selector: 'angular-http-ngrx-store-init',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    PushModule
  ],
  template: `
    <button type="button" (click)="loadJoke()">Load Joke</button>
    <pre>{{joke$ | ngrxPush }}</pre> `,
  styles: [],
  providers: [
    provideComponentStore(StoreStateInitService)
  ]
})
export class StoreStateInitComponent {

  private storeStateInitService = inject(StoreStateInitService);

  joke$ = this.storeStateInitService.joke$;

  loadJoke() {
    this.storeStateInitService.load();
  }
}

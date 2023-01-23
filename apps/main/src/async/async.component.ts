import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AsyncService} from './async.service';

@Component({
  selector: 'angular-http-ngrx-async',
  standalone: true,
  imports: [CommonModule],
  providers: [AsyncService],
  template: `
      <div>
          <button (click)="updateSynchronous()">Update Sync</button>
          <button (click)="updateASync()">Update Async</button>
          <button (click)="resetStates()">Reset States</button>
      </div>
      <div class="wrapper">
          <div>
              <h4>debounce: true</h4>
              <div *ngFor="let state of debouncedStates$ | async">{{state}}</div>
          </div>
          <div>
              <h4>debounce: false</h4>
              <div *ngFor="let state of nonDebouncedStates$ | async ">{{state}}</div>
          </div>
      </div>
  `,
  styles: [`
  .wrapper {
    display: flex;
    gap: 10px;
  }
  `
  ]
})
export class AsyncComponent {

  #asyncService = inject(AsyncService);
  debouncedStates$ = this.#asyncService.debouncedStates$;
  nonDebouncedStates$ = this.#asyncService.nonDebouncedStates$;

  updateSynchronous() {
    this.#asyncService.updateSynchronous();
  }

  updateASync() {
    this.#asyncService.updateAsynchronous();
  }

  resetStates() {
    this.#asyncService.resetStates();
  }
}

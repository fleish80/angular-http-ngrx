import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {takeUntil, tap} from 'rxjs';

interface State {
  toggle: boolean,
  debouncedStates: boolean[];
  nonDebouncedStates: boolean[];
}

@Injectable()
export class AsyncService extends ComponentStore<State> {

  constructor() {
    super({
      toggle: false,
      debouncedStates: [],
      nonDebouncedStates: []
    });
    this.updateNonDebounced$.pipe(takeUntil(this.destroy$)).subscribe();
    this.updateDebounced$.pipe(takeUntil(this.destroy$)).subscribe();
  }

  readonly debouncedStates$ = this.select(s => s.debouncedStates);
  readonly nonDebouncedStates$ = this.select(s => s.nonDebouncedStates);

  readonly updateNonDebounced$ = this.select(s => s.toggle, {debounce: false}).pipe(
    tap(() => console.log('update non debounced selector')),
    tap(c => this.setState(s => ({...s, nonDebouncedStates: [...s.nonDebouncedStates, c]})))
  );

  // {debounce: true}
  readonly updateDebounced$ = this.select(s => s.toggle, {debounce: true}).pipe(
    tap(() => console.log('update debounced selector')),
    tap(c => this.setState(s => ({...s, debouncedStates: [...s.debouncedStates, c]})))
  );

  readonly toggleState = this.updater(
    (state) => ({
      ...state,
      toggle: !state.toggle
    })
  );

  updateSynchronous() {
    console.log('update synchronous');
    this.toggleState();
    this.toggleState();
  }

  updateAsynchronous() {
    setTimeout(() => {
      console.log('update synchronous inside the timeout');
      this.toggleState();
    }, 0);
    console.log('update synchronous outside the timeout');
    this.toggleState();
  }



  resetStates() {
    this.setState(s => ({...s, debouncedStates: [], nonDebouncedStates: []}))
  }
}

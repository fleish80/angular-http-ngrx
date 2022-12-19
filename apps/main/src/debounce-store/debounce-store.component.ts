import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {from, interval, take} from 'rxjs';
import {debounceSync} from '../debounce-sync';

@Component({
  selector: 'angular-http-ngrx-debonce-store',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>debonce-store works!</p> `,
  styles: [],
})
export class DebounceStoreComponent {

  constructor() {
    console.warn("Before interval");

    interval(1).pipe(
      debounceSync(),
      take(3)
    ).subscribe(val => console.log("interval sync", val));

    interval(1).pipe(
      take(3)
    ).subscribe(val => console.log("interval async", val));

    console.warn("Before from");

    from([10, 20, 30]).pipe(
    ).subscribe(val => console.log("fromArray async", val));


    from([10, 20, 30]).pipe(
      debounceSync()
    ).subscribe(val => console.log("fromArray sync", val));


    console.warn("After From");
  }
}

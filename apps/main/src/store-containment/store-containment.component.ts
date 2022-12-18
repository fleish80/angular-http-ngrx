import {Component, inject, OnInit} from '@angular/core';
import {JokesService} from '../jokes.service';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {provideComponentStore} from '@ngrx/component-store';
import {PushModule} from '@ngrx/component';

@Component({
  selector: 'angular-http-ngrx-store-containment',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, PushModule],
  template: `<pre>{{vm$ | ngrxPush | json}}</pre> `,
  styles: [],
  providers: [
    provideComponentStore(JokesService)
  ]
})
export class StoreContainmentComponent implements OnInit {

  private jokesService = inject(JokesService);

  vm$ = this.jokesService.vm$;

  ngOnInit(): void {
    this.jokesService.loadJoke();
    this.jokesService.loadCategories();
  }


}

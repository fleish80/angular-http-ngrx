import {Component, inject, OnInit} from '@angular/core';
import {provideComponentStore} from '@ngrx/component-store';
import {JokesService} from '../jokes.service';
import {PushModule} from '@ngrx/component';

@Component({
  selector: 'angular-http-ngrx-switch-on',
  standalone: true,
  imports: [
    PushModule
  ],
  template: `
    <pre>{{joke$ | ngrxPush}}</pre>
  `,
  styles: [],
  providers: [
    provideComponentStore(JokesService)
  ]
})
export class SwitchOnComponent implements OnInit {

  private jokesService = inject(JokesService);

  joke$ = this.jokesService.joke$;

  ngOnInit(): void {
    this.jokesService.loadJoke();
  }

}

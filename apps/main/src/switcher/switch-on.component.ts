import {Component, inject} from '@angular/core';
import {provideComponentStore} from '@ngrx/component-store';
import {JokesService} from '../jokes.service';
import {PushModule} from '@ngrx/component';

@Component({
  selector: 'angular-standalone-switch-on',
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
export class SwitchOnComponent {

  private jokesService = inject(JokesService);

  joke$ = this.jokesService.joke$;

  ngOnInit(): void {
    this.jokesService.loadJoke();
  }

}

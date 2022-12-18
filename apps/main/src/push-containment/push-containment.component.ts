import {Component, inject} from '@angular/core';
import {provideComponentStore} from '@ngrx/component-store';
import {JokesService} from 'apps/main/src/jokes.service';
import {LetModule, PushModule} from '@ngrx/component';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'angular-http-ngrx-store-containment',
  standalone: true,
  imports: [LetModule, PushModule, JsonPipe],
  template: `
    <ng-container *ngrxLet="{ joke: joke$, categories: categories$ }; let vm">
     {{vm | json}}
    </ng-container> `,
  styles: [],
  providers: [
    provideComponentStore(JokesService)
  ]
})
export class PushContainmentComponent {

  private jokesService = inject(JokesService);

  joke$ = this.jokesService.joke$;
  categories$ = this.jokesService.categories$;

  ngOnInit(): void {
    this.jokesService.loadJoke();
    this.jokesService.loadCategories();
  }

}

import {inject, Injectable} from '@angular/core';
import {ComponentStore, tapResponse} from '@ngrx/component-store';
import {Joke} from './joke.model';
import {Observable, switchMap} from 'rxjs';
import {HttpClient} from '@angular/common/http';


interface State {
  joke: Joke,
  categories: string[]
}

@Injectable()
export class JokesService extends ComponentStore<State> {

  constructor() {
    super({joke: {value: ''}, categories: []});

    this.httpClient.jsonp('https://api.stackexchange.com/2.2/info?site=stackoverflow', 'callback')
      .subscribe(res => console.log(res));

    const callback = (req: any) => {
      alert('xxx');
    }

  }


  private httpClient = inject(HttpClient);


  readonly loadJoke = this.effect((trigger$: Observable<void>) =>
    trigger$.pipe(
      switchMap(() =>
        this.httpClient.get<Joke>('https://api.chucknorris.io/jokes/random').pipe(
          tapResponse(
            (joke) => this.setState(state => ({...state, joke: joke})),
            (error) => console.error(error)
          ))
      )));

  readonly loadCategories = this.effect((trigger$: Observable<void>) =>
    trigger$.pipe(
      switchMap(() =>
        this.httpClient.get<string[]>('https://api.chucknorris.io/jokes/categories').pipe(
          tapResponse(
            (categories) => this.setState(state => ({...state, categories: categories})),
            (error) => console.error(error)
          ))
      )));

  readonly joke$ = this.select(state => state.joke.value);
  readonly categories$ = this.select(state => state.categories);

  readonly vm$ = this.select({joke: this.joke$, categories: this.categories$});

}

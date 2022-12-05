import {inject, Injectable} from '@angular/core';
import {ComponentStore, OnStateInit, OnStoreInit, tapResponse} from '@ngrx/component-store';
import {Joke} from '../joke.model';
import {Observable, switchMap} from 'rxjs';
import {HttpClient} from '@angular/common/http';


interface State {
  joke: Joke
}

@Injectable()
export class StoreStateInitService extends ComponentStore<State> implements OnStoreInit, OnStateInit {

  constructor() {
    super();
  }

  private httpClient = inject(HttpClient);


  readonly load = this.effect((trigger$: Observable<void>) =>
    trigger$.pipe(
      switchMap(() =>
        this.httpClient.get<Joke>('https://api.chucknorris.io/jokes/random').pipe(
          tapResponse(
            (joke) => this.setState({joke}),
            (error) => console.error(error)
          ))
      )));

  readonly joke$ = this.select(state => state.joke.value);

  ngrxOnStoreInit(): void {
    console.log('%cstore init', 'font-size:40px; color:blue');
  }

  ngrxOnStateInit(): void {
    console.log('%cstate init', 'font-size:40px; color:red');

  }

}

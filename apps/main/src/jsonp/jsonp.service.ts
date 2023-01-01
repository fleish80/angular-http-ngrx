import {inject, Injectable} from '@angular/core';
import {ComponentStore, tapResponse} from '@ngrx/component-store';
import {Observable, switchMap} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class JsonpService extends ComponentStore<{ data: unknown }> {


  #httpClient = inject(HttpClient);

  constructor() {
    super({
      data: null
    });
    this.load();
  }

  readonly load = this.effect((trigger$: Observable<void>) =>
    trigger$.pipe(
      switchMap(() =>
        this.#httpClient.jsonp<unknown>('https://api.stackexchange.com/2.2/info?site=stackoverflow', 'callback').pipe(
          tapResponse(
            (data) => this.setState({data}),
            (error) => console.error(error)
          ))
      )));
}

import {AppComponent} from './app/app.component';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideHttpClient} from '@angular/common/http';
import {provideRouter, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'store-state-init'
  },
  {
    path: 'store-state-init',
    loadComponent: () => import('./store-state-init/store-state-init.component').then(m => m.StoreStateInitComponent),
    title: 'Store Init',
  }
];

bootstrapApplication(AppComponent,
  {
    providers: [
      provideHttpClient(),
      provideRouter(routes)
    ]
  })
  .catch((err) => console.error(err));

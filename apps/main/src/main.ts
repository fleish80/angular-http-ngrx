import {AppComponent} from './app/app.component';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideHttpClient} from '@angular/common/http';
import {provideRouter, Routes} from '@angular/router';
import {provideGlobalRouterStore} from '@ngworker/router-component-store';

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
    data: {
      page: 'store-state-init-page'
    }
  },
  {
    path: 'extra',
    loadComponent: () => import('./extra/extra.component').then(m => m.ExtraComponent),
    title: 'Extra',
  },
  {
    path: 'store-containment',
    loadComponent: () => import('./store-containment/store-containment.component').then(m => m.StoreContainmentComponent),
    title: 'Store Containment',
  },
  {
    path: 'push-containment',
    loadComponent: () => import('./push-containment/push-containment.component').then(m => m.PushContainmentComponent),
    title: 'Push Containment',
  }
];

bootstrapApplication(AppComponent,
  {
    providers: [
      provideHttpClient(),
      provideRouter(routes),
      provideGlobalRouterStore()
    ]
  })
  .catch((err) => console.error(err));

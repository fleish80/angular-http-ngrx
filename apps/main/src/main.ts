import {AppComponent} from './app/app.component';
import {bootstrapApplication} from '@angular/platform-browser';
import {
  HTTP_INTERCEPTORS,
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
  withJsonpSupport, withNoXsrfProtection, withXsrfConfiguration
} from '@angular/common/http';
import {provideRouter, Routes} from '@angular/router';
import {provideGlobalRouterStore} from '@ngworker/router-component-store';
import {ExampleInterceptor} from './example.interceptor';

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
  },
  {
    path: 'debounce-store',
    loadComponent: () => import('./debounce-store/debounce-store.component').then(m => m.DebounceStoreComponent),
    title: 'Debounce Store',
  },
  {
    path: 'switcher',
    loadComponent: () => import('./switcher/switcher.component').then(c => c.SwitcherComponent),
    loadChildren: () => import('./switcher/switcher.router').then(r => r.switcherRouter),
  },
  {
    path: 'jsonp',
    loadComponent: () => import('./jsonp/jsonp.component').then(c => c.JsonpComponent),
    title: 'Jsonp',
  },
];

bootstrapApplication(AppComponent,
  {
    providers: [
      {provide: HTTP_INTERCEPTORS, useClass: ExampleInterceptor, multi: true},
      provideHttpClient(
        withInterceptors([(request: HttpRequest<unknown>, next: HttpHandlerFn) => {
          console.log('%cInterceptor', 'font-size:40px; color:green');
          console.log(request);
          return next(request);
        }]),
        withInterceptorsFromDi(),
        withJsonpSupport(),
        // withXsrfConfiguration({
        //   cookieName: 'app-Xsrf-Cookie',
        //   headerName: 'app-Xsrf-Header',
        // }),
        // withNoXsrfProtection()
      ),
      provideRouter(routes),
      provideGlobalRouterStore(),

    ]
  })
  .catch((err) => console.error(err));

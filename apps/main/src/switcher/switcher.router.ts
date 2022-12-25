import {Routes} from '@angular/router';
import {provideHttpClient, withInterceptors, withRequestsMadeViaParent} from '@angular/common/http';

export const switcherRouter: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'on',
  },
  {
    path: 'on',
    loadComponent: () => import('./switch-on.component').then(c => c.SwitchOnComponent),
    title: 'Switch ON',
    providers: [
      provideHttpClient(
        withRequestsMadeViaParent(),
        withInterceptors([
          (request, next) => {
            console.log('%cSwitcher Interceptor', 'font-size:40px; color:orange');
            console.log(request);
            return next(request)
          }])
      )
    ]
  },
  {
    path: 'off',
    loadComponent: () => import('./switch-off.component').then(c => c.SwitchOffComponent),
    title: 'Switch OFF'
  }

]

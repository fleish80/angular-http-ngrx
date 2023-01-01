import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {JsonpService} from './jsonp.service';
import {PushModule} from '@ngrx/component';

@Component({
  selector: 'angular-http-ngrx-jsonp',
  standalone: true,
  imports: [PushModule, JsonPipe],
  template: ` <pre>{{jsonpData$ | ngrxPush | json}}</pre> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [JsonpService]
})
export class JsonpComponent {

  jsonpData$ = inject(JsonpService).state$;

}

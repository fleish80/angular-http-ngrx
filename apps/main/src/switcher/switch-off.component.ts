import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'angular-standalone-switch-off',
  standalone: true,
  imports: [],
  template: ` <p>switch-off works!</p> `,
  styles: [],
})
export class SwitchOffComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

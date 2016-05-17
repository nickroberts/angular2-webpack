import { Component, ViewEncapsulation } from '@angular/core';
import '../sass/app.scss';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  styles: [ require('./app.component.scss') ]
})

export class AppComponent { }

import { Component, OnInit } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {slideInAnimation} from '../animations';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class ResultsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  prepareRoute(outlet: RouterOutlet): any {
    // console.log('当前路由:', outlet?.activatedRouteData?.animation);
    // console.log(typeof outlet?.activatedRouteData?.animation);
    return outlet?.activatedRouteData?.animation;
  }

}

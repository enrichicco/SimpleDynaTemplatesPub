import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavDefs } from '../NavDefs';

@Component({
  selector: 'app-boiler-plate-main-navbar',
  templateUrl: './boiler-plate-main-navbar.component.html',
  styleUrls: ['./boiler-plate-main-navbar.component.css']
})
export class BoilerPlateMainNavbarComponent implements OnInit {
  public static defaultRouterLink: string = '/home';
  public static defaultRouterLinkDesc: string = 'BoilerPlate home';
  @Input('lUrl') lUrl: string = "";
  public resolvedLink: string = "";
  public resolvedLinkLabel: string = "";
  public activatedRouteLink: string = "";
  public activatedRouteLabel: string = "";
  public routesArray: any = [];
  constructor(public router: Router) { 
    this.routesArray = NavDefs.navElements;
  }

  ngOnInit(): void {
  }

}

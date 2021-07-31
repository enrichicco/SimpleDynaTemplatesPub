import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoilerPlateMainNavbarComponent } from '../../boiler-plate-main-navbar/boiler-plate-main-navbar.component';

@Component({
  selector: 'app-boiler-plate-main-navbar-button001',
  templateUrl: './boiler-plate-main-navbar-button001.component.html',
  styleUrls: ['./boiler-plate-main-navbar-button001.component.css']
})
export class BoilerPlateMainNavbarButton001Component implements OnInit {
  @Input('routerLink') routerLink: string | null;
  @Input('routerLinkDesc') routerLinkDesc: string | null;
  constructor(public router: Router) { 
    this.routerLink = null;
    this.routerLinkDesc = null;
  }

  ngOnInit(): void {
    this.routerLink = this.routerLink ?? BoilerPlateMainNavbarComponent.defaultRouterLink;
    this.routerLinkDesc = this.routerLinkDesc ?? BoilerPlateMainNavbarComponent.defaultRouterLinkDesc;
  }

}

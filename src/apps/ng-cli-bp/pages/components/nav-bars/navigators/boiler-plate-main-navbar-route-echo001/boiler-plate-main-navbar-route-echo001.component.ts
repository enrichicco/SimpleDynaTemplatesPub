import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NavDefs } from '../../NavDefs';

@Component({
  selector: 'app-boiler-plate-main-navbar-route-echo001',
  templateUrl: './boiler-plate-main-navbar-route-echo001.component.html',
  styleUrls: ['./boiler-plate-main-navbar-route-echo001.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoilerPlateMainNavbarRouteEcho001Component implements OnInit {
  public routerLabel: string | null;
  public _routerUrl: string | null;
  @Input('routerUrl') set routerUrl(value: string | null) {
    this._routerUrl = value;
    this.buildValues();
  }
  constructor() { 
    this.routerLabel = null;
    this._routerUrl = null
  }

  ngOnInit(): void {

  }

  buildValues(): void {
    if (this._routerUrl) {
      let unslashedUrl = this._routerUrl.charAt(0) === '/' ? this._routerUrl.substring(1) :  this._routerUrl;
      this.routerLabel = this.findInMap(NavDefs.navElements, this._routerUrl).label ?? "no route detected";
    } else {
      if (this._routerUrl === "") {
        this._routerUrl = "__EMPTY__";
        this.routerLabel = this.findInMap(NavDefs.navElements, "__EMPTY__").label ?? "empty route";
      } else {
        this._routerUrl = "missing route or null route";
      }
    }

  }
  private findInMap(theMap: any[], value: string){
    const theVale = theMap.find((_value, index) => {
      return _value.link === value
    });
    return theVale || {"label": "no route detected"};
  }
}

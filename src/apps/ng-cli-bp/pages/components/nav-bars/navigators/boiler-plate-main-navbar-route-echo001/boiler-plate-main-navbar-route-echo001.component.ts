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
  public translatedLabel: string | null;
  constructor() { 
    this.routerLabel = null;
    this._routerUrl = null
    this.translatedLabel = null;
  }

  ngOnInit(): void {

  }

  buildValues(): void {
    let unslashedUrl = this._routerUrl && this._routerUrl.charAt(0) === '/' ? this._routerUrl.substring(1) :  this._routerUrl ?? "__EMPTY__";
    unslashedUrl = unslashedUrl === "" ? "/" : unslashedUrl;
    this._routerUrl = this._routerUrl ?? "missing route or null route";
    if (unslashedUrl === "/") {
      this.routerLabel = (NavDefs.routesLabels["__SLASHONLY__"] || {}) ?? "no route detected";
    } else {
      if (unslashedUrl === "__EMPTY__") {
        this.routerLabel = (NavDefs.routesLabels["__EMPTY__"] || {}) ?? "no route detected";
      } else {
        this.routerLabel = this.findInMap(NavDefs.navElements, unslashedUrl).label ?? "no route detected";
      }
    }
    this.translatedLabel = NavDefs.routesLabels[this._routerUrl] ?? "unknown position";

  }
  private findInMap(theMap: any[], value: string){
    const theVale = theMap.find((_value, index) => {
      return _value.link === value
    });
    return theVale || {"label": "no route detected"};
  }
}

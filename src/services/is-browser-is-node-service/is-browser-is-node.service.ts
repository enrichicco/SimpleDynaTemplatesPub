import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class IsBrowserIsNodeService {
  _isBrowser: boolean;
  _isNode: boolean;
  forceIsBrowser: boolean = false;
  platformId: any;
  constructor(@Inject(PLATFORM_ID) platformId: any ) {
    this.platformId = platformId;
    if (this.forceIsBrowser){
      this._isBrowser = true;
      this._isNode = false;
    } else {
      this._isBrowser = isPlatformBrowser(platformId);
      this._isNode = !isPlatformBrowser(platformId);
    }
  }
}

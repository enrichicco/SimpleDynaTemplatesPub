import { Injectable } from "@angular/core";
import { Twins } from "src/services/dyna-components/components-factories-cache-services/types/components-factories-cache-types";
import { DynaButtonComponent } from "../../comps-mods/eager-components/dyna-button/dyna-button.component";
import { DynaLabelComponent } from "../../comps-mods/eager-components/dyna-label/dyna-label.component";

@Injectable({
  providedIn: 'root'
})
export class EagerFilesService {

  constructor(){

  }

  public itemsForCache(): Twins<any>[]{
    return [
      {
        "name": "button_00"
        , component: DynaButtonComponent
      }, {
        "name": "label_00"
        , component: DynaLabelComponent
      }
      
    ];
  }


}
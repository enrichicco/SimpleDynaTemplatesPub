import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynaButtonComponent } from '../eager-components/dyna-button/dyna-button.component';
import { DynaLabelComponent } from '../eager-components/dyna-label/dyna-label.component';




@NgModule({
  declarations: [
    DynaButtonComponent,
    DynaLabelComponent,

  ],
  imports: [
    CommonModule
  ]
})
export class EagerComponentsOutletModule { 

}

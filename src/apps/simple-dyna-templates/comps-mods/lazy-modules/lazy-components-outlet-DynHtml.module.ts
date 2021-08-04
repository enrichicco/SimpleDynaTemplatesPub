import { ComponentFactory, ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaticTemplateIvyRenderedOutletService } from 'src/services/dyna-components/static-template-ivy-rendered-outlet-service/static-template-ivy-rendered-outlet-service';
import { NgModuleWithComponentBuilder } from 'src/services/dyna-components/components-factories-cache-services/types/lazy-cache.types';

import { DynamicContentOutletErrorComponent } from '../lazy-components/static-templates/dynamic-content-outlet-error.component';
import { DynamicHtmlContentOutletTestComponent } from '../lazy-components/dyna-templates/dynamic-html-content-outlet-test-component';


//
// commodity module to be compiled runtime in order to build a dynamic component
//
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DynamicContentOutletModule04 implements NgModuleWithComponentBuilder{
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private dynamicContentOutletService: StaticTemplateIvyRenderedOutletService){

  }
  resolveComponent(componentName: string): ComponentFactory<any>{
    let result: ComponentFactory<any>;
    switch(componentName){
      case "dynamicHtmlContentOutletTestComponent":
        result = this.componentFactoryResolver.resolveComponentFactory(DynamicHtmlContentOutletTestComponent);
        break;
      default:
        result = this.componentFactoryResolver.resolveComponentFactory(DynamicContentOutletErrorComponent);
        break;
    }
    return result;
  }
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DynamicContentOutletModule03b { 

}

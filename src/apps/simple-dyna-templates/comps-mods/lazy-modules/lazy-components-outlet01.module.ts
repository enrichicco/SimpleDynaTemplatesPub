import { ComponentFactory, ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaticTemplateIvyRenderedOutletService } from 'src/services/dyna-components/static-template-ivy-rendered-outlet-service/static-template-ivy-rendered-outlet-service';
import { NgModuleWithComponentBuilder } from 'src/services/dyna-components/components-factories-cache-services/types/lazy-cache.types';

import { DynamicContentOutletErrorComponent } from '../lazy-components/static-templates/dynamic-content-outlet-error.component';
import { DynamicContentOutletTest1Component } from '../lazy-components/static-templates/dynamic-content-outlet-test1.component';


//
// commodity module to be compiled runtime in order to build a dynamic component
//
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DynamicContentOutletModule01 implements NgModuleWithComponentBuilder{
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private dynamicContentOutletService: StaticTemplateIvyRenderedOutletService){

  }
  resolveComponent(componentName: string): ComponentFactory<any>{
    let result: ComponentFactory<any>;
    switch(componentName){
      case "dynamicContentOutletTest1Component":
        result = this.componentFactoryResolver.resolveComponentFactory(DynamicContentOutletTest1Component);
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
export class DynamicContentOutletModule01b { 

}

import { ComponentFactory, ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicContentOutletErrorComponent } from '../lazy-components/static-templates/dynamic-content-outlet-error.component';
import { DynamicContentOutletTest1Component } from '../lazy-components/static-templates/dynamic-content-outlet-test1.component';
import { DynamicContentOutletTest2Component } from '../lazy-components/static-templates/dynamic-content-outlet-test2.component';
import { DynamicContentOutletTest3Component } from '../lazy-components/static-templates/dynamic-content-outlet-test3.component';
import { DynamicContentOutletTest4Component } from '../lazy-components/static-templates/dynamic-content-outlet-test4.component';
// import { NgModuleWithComponentBuilder } from '../lazy-cache/lazy-cache.types';
import { StaticTemplateIvyRenderedOutletService } from 'src/services/dyna-components/static-template-ivy-rendered-outlet-service/static-template-ivy-rendered-outlet-service';
import { NgModuleWithComponentBuilder } from 'src/services/dyna-components/components-factories-cache-services/types/lazy-cache.types';
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
export class DynamicContentOutletModule1 implements NgModuleWithComponentBuilder{
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private dynamicContentOutletService: StaticTemplateIvyRenderedOutletService){

  }
  resolveComponent(componentName: string): ComponentFactory<any>{
    let result: ComponentFactory<any>;
    switch(componentName){
      case "dynamicContentOutletTest1Component":
        result = this.componentFactoryResolver.resolveComponentFactory(DynamicContentOutletTest1Component);
        break;
      case "dynamicContentOutletTest2Component":
        result = this.componentFactoryResolver.resolveComponentFactory(DynamicContentOutletTest2Component);
        break;
      case "dynamicContentOutletTest3Component":
        result = this.componentFactoryResolver.resolveComponentFactory(DynamicContentOutletTest3Component);
        break;
      case "dynamicContentOutletTest4Component":
        result = this.componentFactoryResolver.resolveComponentFactory(DynamicContentOutletTest4Component);
        break;
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
export class DynamicContentOutletModule2 { 

}

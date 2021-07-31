

//
// https://www.intertech.com/angular-development-6-dynamic-component-generation/
// https://github.com/IntertechInc/angular-blog-series-solution
//





import { ComponentFactory, ComponentFactoryResolver, Injectable, Type } from '@angular/core';
import { ComponentCaster, ComponentClass, Twins } from './components-factories-cache-types';




@Injectable({
  providedIn: 'root'
})
export class DynamicComponentsFactoriesAndModulesCacheService {

  private compFactoryMap = new Map<string, ComponentCaster<any>>();
  //
  //
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {

  }
  public loadFactory(comp: Twins<any>): ComponentCaster<any>{
    const typ: Type<any> = comp.component;
    const theMapItem: ComponentCaster<typeof typ> = {
      name: comp.name
      , component: comp.component
      , componentFactory: this.componentFactoryResolver.resolveComponentFactory(comp.component)
    };
    this.compFactoryMap.set(comp.name, theMapItem);
    return theMapItem;
  }
  public loadFactories(...components: Twins<any>[]){
    for (let xxx of components) {
      this.loadFactory(xxx);
    }
  }
  public getComponent(componentName: string): ComponentClass | undefined {
    return !!this.compFactoryMap.get(componentName) ? this.compFactoryMap.get(componentName)!.component : undefined;
  }
  public getComponentFactory(componentName: string): ComponentFactory<unknown>  | undefined{
    return !!this.compFactoryMap.get(componentName) ? this.compFactoryMap.get(componentName)!.componentFactory : undefined;
  }
}


/*

private buttonFactory: ComponentFactory<DynaButtonComponent>;
private labelFactory: ComponentFactory<DynaLabelComponent>;

*/
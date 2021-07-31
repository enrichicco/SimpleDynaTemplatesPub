

//
// https://www.intertech.com/angular-development-6-dynamic-component-generation/
// https://github.com/IntertechInc/angular-blog-series-solution
//





import { ComponentFactory, ComponentFactoryResolver, Injectable, Type } from '@angular/core';

interface Component { };
type ComponentClass = { new (): Component };

export interface Twins<T> {
  name: string;
  component: Type<T>;
}

export interface ComponentCaster<T> {
  name: string;
  component: ComponentClass;
  componentFactory: ComponentFactory<T>;
}


@Injectable({
  providedIn: 'root'
})

export class DynamicComponentService {

  private compFactoryMap = new Map<string, ComponentCaster<any>>();
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {

  }
  loadFactories(...components: Twins<any>[]){
    for (let xxx of components) {
      const typ: Type<any> = xxx.component;
      const theMapItem: ComponentCaster<typeof typ> = {
        name: xxx.name
        , component: xxx.component
        , componentFactory: this.componentFactoryResolver.resolveComponentFactory(xxx.component)
      }
      this.compFactoryMap.set(xxx.name, theMapItem);
    }
  }
  public getTypeFor(name: string): ComponentClass | undefined {
    return !!this.compFactoryMap.get(name) ? this.compFactoryMap.get(name)!.component : undefined;
  }
  public getFactory(whichOne: string): ComponentFactory<unknown>  | undefined{
    return !!this.compFactoryMap.get(whichOne) ? this.compFactoryMap.get(whichOne)!.componentFactory : undefined;
  }
}


/*

private buttonFactory: ComponentFactory<DynaButtonComponent>;
private labelFactory: ComponentFactory<DynaLabelComponent>;

*/
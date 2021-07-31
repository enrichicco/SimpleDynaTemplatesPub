import { ComponentFactory, Type } from "@angular/core";

type ModuleWithDynamicComponents = Type<any> & {
  dynamicComponentsMap: {[key: string]: any};
};

type NgComponentBaseType = "NgModule" | "NgComponent";

export interface NgModuleWithComponentBuilder {
  resolveComponent(componentName: string): ComponentFactory<any>
}

export interface NgObjectsRefContainer<T extends ModuleRefDefinition | ComponentRefDefinition>{
  items: T[]
  , areRefsOk: boolean

}


export interface ComponentRefDefinition{
  dynamicNgObj: Promise<any>
  , solvedNgObj: any
  , solvedFactory: any
  , ngObjOriginalName: string
  , ngObjOriginalType: string
  , ngObjBaseType: NgComponentBaseType
  , isReady: boolean
  , bindingFunction: (m: any) => any
  , bindingFunctionIsActive: boolean
}

export interface ModuleRefDefinition{
  dynamicNgObj: Promise<any>
  , solvedNgObj: any
  , solvedFactory: any
  , ngObjOriginalName: string
  , ngObjOriginalType: string
  , ngObjBaseType: NgComponentBaseType
  , isReady: boolean
  , bindingFunction: (m: any) => any
  , bindingFunctionIsActive: boolean
}



//
//
// inspired (copied) by:
//
//  https://itnext.io/building-an-aot-friendly-dynamic-content-outlet-in-angular-c2790195cb94
//
//
//


export interface RegistryItem {
  componentName: string;
  modulePath: string;
  moduleName: string;
}
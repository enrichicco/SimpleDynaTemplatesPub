import { Injectable } from '@angular/core';
import { ComponentRefDefinition, ModuleRefDefinition, RegistryItem } from '../../../../services/lazy-cache/lazy-cache.types';
// import { ComponentRefDefinition, ModuleRefDefinition } from '../ng-gtv8-new-ivy-ok/lazy-loader.service';

@Injectable({
  providedIn: 'root'
})
export class LazyFilesService {

  constructor(){

  }

  //
  // ==============================================================================
  //
  //  Loaders for the new (after ng8) dynamic system (load module and component using static import)
  //

  private lazyModules: ModuleRefDefinition[] | null = null;
  private lazyComponents: ComponentRefDefinition[] | null = null;

  private getNgClassRef(className: string, collection: ModuleRefDefinition[] | ComponentRefDefinition[] ) : ModuleRefDefinition | ComponentRefDefinition | undefined{
    const theItem: ModuleRefDefinition | ComponentRefDefinition | undefined = collection.find((item) => item.ngObjOriginalName === className);
    return theItem;
  }
  public getModuleRef(moduleName: string): ModuleRefDefinition | undefined  {
    if (!this.lazyModules) {
      this.lazyModules = this.getModules();
    }
    const theModule: ModuleRefDefinition | undefined = this.getNgClassRef(moduleName, this.lazyModules!);
    return theModule;
  }
  public getComponentRef(compName: string): ComponentRefDefinition | undefined{
    if (!this.lazyComponents) {
      this.lazyComponents = this.getComponents();
    }
    const theComponent: ComponentRefDefinition | undefined = this.getNgClassRef(compName, this.lazyComponents!);
    return theComponent;
  }

  public getModules(): ModuleRefDefinition[]{
    const pippe: string = '../lazy-modules/dynamic-content-outlet.module';
    const pippa: ModuleRefDefinition[] = [
      {
        dynamicNgObj: import('../../comps-mods/lazy-modules/dynamic-content-outlet.module') // .then(m => m.DynamicContentOutletModule1)
        , solvedNgObj: null
        , solvedFactory: null
        , ngObjOriginalName: "dynamicContentOutletModule1"
        , ngObjOriginalType: "DynamicContentOutletModule1"
        , ngObjBaseType: "NgModule"
        , isReady: false
        , bindingFunction: (m: any) => { 
          return m.DynamicContentOutletModule1;
        }
        , bindingFunctionIsActive: false
      }
      , {
        dynamicNgObj: import('../../comps-mods/lazy-modules/dynamic-content-outlet.module') // .then(m => m.DynamicContentOutletModule2)
        , solvedNgObj: null
        , solvedFactory: null
        , ngObjOriginalName: "dynamicContentOutletModule2"
        , ngObjOriginalType: "DynamicContentOutletModule2"
        , ngObjBaseType: "NgModule"
        , isReady: false
        , bindingFunction: (m: any) => { 
          return m.DynamicContentOutletModule2;
        }
        , bindingFunctionIsActive: false
      }
    
    ];
    return pippa;
  }
  public getComponents() {
    const pappa: ComponentRefDefinition[] = [
      {
        dynamicNgObj: import('../../comps-mods/lazy-components/static-templates/dynamic-content-outlet-test1.component') // .then(m => m.DynamicContentOutletTest3Component)
        , solvedNgObj: null
        , solvedFactory: null
        , ngObjOriginalName: "dynamicContentOutletTest1Component"
        , ngObjOriginalType: "DynamicContentOutletTest1Component"
        , ngObjBaseType: "NgComponent"
        , isReady: false
        , bindingFunction: function(m: any) { 
          return m.DynamicContentOutletTest1Component;
        }
        , bindingFunctionIsActive: false
      }
      , {
          dynamicNgObj: import('../../comps-mods/lazy-components/static-templates/dynamic-content-outlet-test2.component') // .then(m => m.DynamicContentOutletTest3Component)
        , solvedNgObj: null
        , solvedFactory: null
        , ngObjOriginalName: "dynamicContentOutletTest2Component"
        , ngObjOriginalType: "DynamicContentOutletTest2Component"
        , ngObjBaseType: "NgComponent"
        , isReady: false
        , bindingFunction: function(m: any) { 
          return m.DynamicContentOutletTest2Component;
        }
        , bindingFunctionIsActive: false
      }
      , {
        dynamicNgObj: import('../../comps-mods/lazy-components/static-templates/dynamic-content-outlet-test3.component') // .then(m => m.DynamicContentOutletTest3Component)
        , solvedNgObj: null
        , solvedFactory: null
        , ngObjOriginalName: "dynamicContentOutletTest3Component"
        , ngObjOriginalType: "DynamicContentOutletTest3Component"
        , ngObjBaseType: "NgComponent"
        , isReady: false
        , bindingFunction: function(m: any) { 
          return m.DynamicContentOutletTest3Component;
        }
        , bindingFunctionIsActive: false
      }
      , {
        dynamicNgObj: import('../../comps-mods/lazy-components/static-templates/dynamic-content-outlet-test4.component') // .then(m => m.DynamicContentOutletTest4Component)
      , solvedNgObj: null
      , solvedFactory: null
      , ngObjOriginalName: "dynamicContentOutletTest4Component"
      , ngObjOriginalType: "DynamicContentOutletTest4Component"
      , ngObjBaseType: "NgComponent"
      , isReady: false
      , bindingFunction: function(m:any) { 
        return m.DynamicContentOutletTest4Component;
      }
      , bindingFunctionIsActive: false
      }
      , {
          dynamicNgObj: import('../../comps-mods/lazy-components/dyna-templates/dynamic-html-content-outlet-test-component') // .then(m => m.DynamicContentOutletTest4Component)
        , solvedNgObj: null
        , solvedFactory: null
        , ngObjOriginalName: "dynamicHtmlContentOutletTestComponent"
        , ngObjOriginalType: "DynamicHtmlContentOutletTestComponent"
        , ngObjBaseType: "NgComponent"
        , isReady: false
        , bindingFunction: function(m:any) { 
          return m.DynamicContentOutletTest4Component;
        }
        , bindingFunctionIsActive: false
      }
    ];
    return pappa;    
  }

  // ==================================================================================================
  //
  //
  // ==============================================================================
  //
  //  Loaders for the old (pre ng 8) dynamic system (load module from path)
  //
  // members for deprecated (pre ng 8) system
  //
  dynamicContentOutletRegistry: RegistryItem[] | null = null;

  public getDynamicContentOutletRegistry(): RegistryItem[] | null {
    return this.dynamicContentOutletRegistry;
  }
  
  public getRegistryItem(componentName: string): RegistryItem | undefined {
    if(this.dynamicContentOutletRegistry) {
      const registryItem = this.dynamicContentOutletRegistry.find(
        i => i.componentName === componentName
      );
      return registryItem;
    }
    return undefined;
  }

}
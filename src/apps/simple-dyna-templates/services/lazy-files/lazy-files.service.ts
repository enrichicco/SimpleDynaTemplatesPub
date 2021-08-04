import { Injectable } from '@angular/core';
import { ComponentRefDefinition, ModuleRefDefinition, RegistryItem } from '../../../../services/dyna-components/components-factories-cache-services/types/lazy-cache.types';

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
        dynamicNgObj: () => import('../../comps-mods/lazy-modules/lazy-components-outlet01.module') // .then(m => m.DynamicContentOutletModule01)
        , solvedNgObj: null
        , solvedFactory: null
        , ngObjOriginalName: "dynamicContentOutletModule01"
        , ngObjOriginalType: "DynamicContentOutletModule01"
        , ngObjBaseType: "NgModule"
        , isReady: false
        , bindingFunction: (m: any) => { 
          // return m.DynamicContentOutletModule0
          1;
        }
        , bindingFunctionIsActive: false
      }
      , {
        dynamicNgObj: () => import('../../comps-mods/lazy-modules/lazy-components-outlet01.module') // .then(m => m.DynamicContentOutletModule01b)
        , solvedNgObj: null
        , solvedFactory: null
        , ngObjOriginalName: "dynamicContentOutletModule01b"
        , ngObjOriginalType: "DynamicContentOutletModule01b"
        , ngObjBaseType: "NgModule"
        , isReady: false
        , bindingFunction: (m: any) => { 
          // return m.DynamicContentOutletModule01b;
        }
        , bindingFunctionIsActive: false
      }
      , {
        dynamicNgObj: () => import('../../comps-mods/lazy-modules/lazy-components-outlet02.module') // .then(m => m.DynamicContentOutletModule01)
        , solvedNgObj: null
        , solvedFactory: null
        , ngObjOriginalName: "dynamicContentOutletModule02"
        , ngObjOriginalType: "DynamicContentOutletModule02"
        , ngObjBaseType: "NgModule"
        , isReady: false
        , bindingFunction: (m: any) => { 
          // return m.DynamicContentOutletModule0
          1;
        }
        , bindingFunctionIsActive: false
      }
      , {
        dynamicNgObj: () => import('../../comps-mods/lazy-modules/lazy-components-outlet02.module') // .then(m => m.DynamicContentOutletModule01b)
        , solvedNgObj: null
        , solvedFactory: null
        , ngObjOriginalName: "dynamicContentOutletModule02b"
        , ngObjOriginalType: "DynamicContentOutletModule02b"
        , ngObjBaseType: "NgModule"
        , isReady: false
        , bindingFunction: (m: any) => { 
          // return m.DynamicContentOutletModule01b;
        }
        , bindingFunctionIsActive: false
      }
      , {
        dynamicNgObj: () => import('../../comps-mods/lazy-modules/lazy-components-outlet03.module') // .then(m => m.DynamicContentOutletModule01)
        , solvedNgObj: null
        , solvedFactory: null
        , ngObjOriginalName: "dynamicContentOutletModule03"
        , ngObjOriginalType: "DynamicContentOutletModule03"
        , ngObjBaseType: "NgModule"
        , isReady: false
        , bindingFunction: (m: any) => { 
          // return m.DynamicContentOutletModule0
          1;
        }
        , bindingFunctionIsActive: false
      }
      , {
        dynamicNgObj: () => import('../../comps-mods/lazy-modules/lazy-components-outlet03.module') // .then(m => m.DynamicContentOutletModule01b)
        , solvedNgObj: null
        , solvedFactory: null
        , ngObjOriginalName: "dynamicContentOutletModule03b"
        , ngObjOriginalType: "DynamicContentOutletModule03b"
        , ngObjBaseType: "NgModule"
        , isReady: false
        , bindingFunction: (m: any) => { 
          // return m.DynamicContentOutletModule01b;
        }
        , bindingFunctionIsActive: false
      }
      , {
        dynamicNgObj: () => import('../../comps-mods/lazy-modules/lazy-components-outlet04.module') // .then(m => m.DynamicContentOutletModule01)
        , solvedNgObj: null
        , solvedFactory: null
        , ngObjOriginalName: "dynamicContentOutletModule04"
        , ngObjOriginalType: "DynamicContentOutletModule04"
        , ngObjBaseType: "NgModule"
        , isReady: false
        , bindingFunction: (m: any) => { 
          // return m.DynamicContentOutletModule0
          1;
        }
        , bindingFunctionIsActive: false
      }
      , {
        dynamicNgObj: () => import('../../comps-mods/lazy-modules/lazy-components-outlet04.module') // .then(m => m.DynamicContentOutletModule01b)
        , solvedNgObj: null
        , solvedFactory: null
        , ngObjOriginalName: "dynamicContentOutletModule04b"
        , ngObjOriginalType: "DynamicContentOutletModule04b"
        , ngObjBaseType: "NgModule"
        , isReady: false
        , bindingFunction: (m: any) => { 
          // return m.DynamicContentOutletModule01b;
        }
        , bindingFunctionIsActive: false
      }
      , {
        dynamicNgObj: () => import('../../comps-mods/lazy-modules/lazy-components-outlet-DynHtml.module') // .then(m => m.DynamicContentOutletModule01)
        , solvedNgObj: null
        , solvedFactory: null
        , ngObjOriginalName: "dynamicContentOutletDynHtmlModule"
        , ngObjOriginalType: "DynamicContentOutletDynHtmlModule"
        , ngObjBaseType: "NgModule"
        , isReady: false
        , bindingFunction: (m: any) => { 
          // return m.DynamicContentOutletModule0
          1;
        }
        , bindingFunctionIsActive: false
      }
      , {
        dynamicNgObj: () => import('../../comps-mods/lazy-modules/lazy-components-outlet-DynHtml.module') // .then(m => m.DynamicContentOutletModule01)
        , solvedNgObj: null
        , solvedFactory: null
        , ngObjOriginalName: "dynamicContentOutletDynBiHtmlModule"
        , ngObjOriginalType: "DynamicContentOutletDynBiHtmlModule"
        , ngObjBaseType: "NgModule"
        , isReady: false
        , bindingFunction: (m: any) => { 
          // return m.DynamicContentOutletModule01b;
        }
        , bindingFunctionIsActive: false
      }

    
    ];
    return pippa;
  }
  public getComponents() {
    const pappa: ComponentRefDefinition[] = [
      {
        dynamicNgObj: () => import('../../comps-mods/lazy-components/static-templates/dynamic-content-outlet-error.component') // .then(m => m.DynamicContentOutletTest3Component)
        , solvedNgObj: null
        , solvedFactory: null
        , ngObjNeededModule: "dynamicContentOutletErrorModule"
        , ngObjOriginalName: "dynamicContentOutletErrorComponent"
        , ngObjOriginalType: "DynamicContentOutletErrorComponent"
        , ngObjBaseType: "NgComponent"
        , isReady: false
        , bindingFunction: function(m: any) { 
          // return m.DynamicContentOutletErrorComponent;
        }
        , bindingFunctionIsActive: false
      }
      , {
        dynamicNgObj: () => import('../../comps-mods/lazy-components/static-templates/dynamic-content-outlet-test1.component') // .then(m => m.DynamicContentOutletTest3Component)
        , solvedNgObj: null
        , solvedFactory: null
        , ngObjNeededModule: "dynamicContentOutletModule01"
        , ngObjOriginalName: "dynamicContentOutletTest1Component"
        , ngObjOriginalType: "DynamicContentOutletTest1Component"
        , ngObjBaseType: "NgComponent"
        , isReady: false
        , bindingFunction: function(m: any) { 
          // return m.DynamicContentOutletTest1Component;
        }
        , bindingFunctionIsActive: false
      }
      , {
          dynamicNgObj: () => import('../../comps-mods/lazy-components/static-templates/dynamic-content-outlet-test2.component') // .then(m => m.DynamicContentOutletTest3Component)
        , solvedNgObj: null
        , solvedFactory: null
        , ngObjNeededModule: "dynamicContentOutletModule02"
        , ngObjOriginalName: "dynamicContentOutletTest2Component"
        , ngObjOriginalType: "DynamicContentOutletTest2Component"
        , ngObjBaseType: "NgComponent"
        , isReady: false
        , bindingFunction: function(m: any) { 
          // return m.DynamicContentOutletTest2Component;
        }
        , bindingFunctionIsActive: false
      }
      , {
        dynamicNgObj: () => import('../../comps-mods/lazy-components/static-templates/dynamic-content-outlet-test3.component') // .then(m => m.DynamicContentOutletTest3Component)
        , solvedNgObj: null
        , solvedFactory: null
        , ngObjNeededModule: "dynamicContentOutletModule03"
        , ngObjOriginalName: "dynamicContentOutletTest3Component"
        , ngObjOriginalType: "DynamicContentOutletTest3Component"
        , ngObjBaseType: "NgComponent"
        , isReady: false
        , bindingFunction: function(m: any) { 
          // return m.DynamicContentOutletTest3Component;
        }
        , bindingFunctionIsActive: false
      }
      , {
        dynamicNgObj: () => import('../../comps-mods/lazy-components/static-templates/dynamic-content-outlet-test4.component') // .then(m => m.DynamicContentOutletTest4Component)
      , solvedNgObj: null
      , solvedFactory: null
      , ngObjNeededModule: "dynamicContentOutletModule04"
      , ngObjOriginalName: "dynamicContentOutletTest4Component"
      , ngObjOriginalType: "DynamicContentOutletTest4Component"
      , ngObjBaseType: "NgComponent"
      , isReady: false
      , bindingFunction: function(m:any) { 
        // return m.DynamicContentOutletTest4Component;
      }
      , bindingFunctionIsActive: false
      }
      , {
          dynamicNgObj: () => import('../../comps-mods/lazy-components/dyna-templates/dynamic-html-content-outlet-test-component') // .then(m => m.DynamicContentOutletTest4Component)
        , solvedNgObj: null
        , solvedFactory: null
        , ngObjNeededModule: "dynamicContentOutletDynHtmlModule"
        , ngObjOriginalName: "dynamicHtmlContentOutletTestComponent"
        , ngObjOriginalType: "DynamicHtmlContentOutletTestComponent"
        , ngObjBaseType: "NgComponent"
        , isReady: false
        , bindingFunction: function(m:any) { 
          // return m.DynamicContentOutletTest4Component;
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
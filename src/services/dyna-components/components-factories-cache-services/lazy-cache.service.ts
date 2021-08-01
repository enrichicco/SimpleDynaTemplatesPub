import { Injectable } from "@angular/core";
import { LazyFilesService } from "../../../apps/simple-dyna-templates/services/lazy-files/lazy-files.service";
import { ComponentRefDefinition, ModuleRefDefinition, NgObjectsRefContainer, RegistryItem,  } from "./types/lazy-cache.types";

@Injectable({
  providedIn: 'root'
})
export class LazyCacheService {
  constructor(
  ){

  }

  //
  //
  // ==================================================================================================
  //
  //
  // ==================================================================================================
  //
  // member for most recent (after ng 8) system
  private moduleRefs: NgObjectsRefContainer<ModuleRefDefinition> = {
    items: [] /* as ModuleRefDefinition[] */
    , areRefsOk: false
  };
  private componentRefs: NgObjectsRefContainer<ComponentRefDefinition> = {
    items: [] /* as ComponentRefDefinition[] */
    , areRefsOk: false
  };




  //
  // ==================================================================================================
  //
  // get ngObj ref from given map
  //
  private getNgObjInMap(ngObjName: string, collection: NgObjectsRefContainer<ComponentRefDefinition | ModuleRefDefinition>  ) : ModuleRefDefinition | ComponentRefDefinition | undefined{
    return collection.items.find(item => item.ngObjOriginalName === ngObjName);
  }

  public getModuleInMap(ngObjName: string) : ModuleRefDefinition | ComponentRefDefinition | undefined {
    return this.getNgObjInMap(ngObjName,this.moduleRefs);
  }

  public getComponentInMap(ngObjName: string) : ModuleRefDefinition | ComponentRefDefinition | undefined {
    return this.getNgObjInMap(ngObjName,this.componentRefs);
  }

  //
  // ==================================================================================================
  //
  // caches/maps status
  //

  //
  // dynamic property: is given map ready (all promised loads solved)?
  private checkNgObjMap(ngObjRefs: NgObjectsRefContainer<ModuleRefDefinition | ComponentRefDefinition>): boolean {
    if (! ngObjRefs.areRefsOk) {
      let theResult = true;
      for (let xxx of ngObjRefs.items) {
        theResult = theResult && xxx.isReady
      }
      ngObjRefs.areRefsOk = theResult
    }
    return ngObjRefs.areRefsOk;
  }

  public get isModuleMapReady(): boolean  {
    return this.checkNgObjMap(this.moduleRefs) && (this.moduleRefs.items.length > 0);
  }
  public get isComponentMapReady(): boolean  {
    return this.checkNgObjMap(this.componentRefs);
  };
  public get checkAllLazyNgObjsMaps(): boolean {
    return this.isComponentMapReady && this.isModuleMapReady;
  }




  //
  // ==================================================================================================
  //
  // check if an item is present and ready
  //
  private isNgObjInMapAndReady(ngObjName: string, collection: NgObjectsRefContainer<ComponentRefDefinition | ModuleRefDefinition>  ){
    const theItem: ModuleRefDefinition | ComponentRefDefinition | undefined = collection.items.find(item => item.ngObjOriginalName === ngObjName);
    return !!theItem && theItem.isReady;

  }
  public isModuleInMap(moduleName: string): boolean {
    return this.isNgObjInMapAndReady(moduleName, this.moduleRefs);
  }
  public isComponentInMap(compName: string): boolean {
    return this.isNgObjInMapAndReady(compName, this.componentRefs);
  }

    
  //
  // ==================================================================================================
  //
  // put ngObj ref in given map and return loader promise
  //
  private loadSingleNgObjInMap(ngObj:ModuleRefDefinition | ComponentRefDefinition, ngObjRefs: NgObjectsRefContainer<ModuleRefDefinition | ComponentRefDefinition>): Promise<any>{
    ngObjRefs.items.push(ngObj);
    return ngObj.dynamicNgObj.then(m => {
      if (ngObj.bindingFunctionIsActive) {
        ngObj.solvedNgObj = ngObj.bindingFunction(m); 
      } else {
        ngObj.solvedNgObj = m;
      }
      // set ok for this component/module and update this repo status...
      ngObj.isReady = true;
      this.checkNgObjMap(ngObjRefs);
      return ngObj.solvedNgObj;
    });
  }

  public loadSingleNgComponentInMap(obj:ComponentRefDefinition): Promise<any> {
    return this.loadSingleNgObjInMap(obj,this.componentRefs);
  }

  public loadSingleNgModuleInMap(obj:ModuleRefDefinition): Promise<any> {
    return this.loadSingleNgObjInMap(obj,this.moduleRefs);
  }


  //
  // ==================================================================================================
  //
  // get object from modules/components/factories cache
  // put the module/component in cache if not present
  private resolveNgObj(ngObjRef: ModuleRefDefinition | ComponentRefDefinition,  collection: NgObjectsRefContainer<ModuleRefDefinition | ComponentRefDefinition>): Promise<any> {
    const theItem = this.getNgObjInMap(ngObjRef.ngObjOriginalName, collection);
    if (!theItem) {
      return this.loadSingleNgObjInMap(ngObjRef, collection)
    }
    if (theItem.isReady) {
      const promValue = new Promise<any>((resolve,reject) => {
        resolve(theItem.solvedNgObj);
      })
      return promValue;
    }
    return theItem.dynamicNgObj;
  }
  public resolveModuleObj(ngObjRef: ModuleRefDefinition | ComponentRefDefinition): Promise<any> {
    return this.resolveNgObj(ngObjRef,this.moduleRefs);
  }

  public resolveComponentObj(ngObjRef: ModuleRefDefinition | ComponentRefDefinition): Promise<any>{
    return this.resolveNgObj(ngObjRef,this.componentRefs);
    
  }



  //
  // ==================================================================================================
  //
  // build all or given maps 
  //
  public buildModulesMap(... moduleItems: ModuleRefDefinition[] | ComponentRefDefinition[]){
    for(let xxx of moduleItems) {
      this.loadSingleNgModuleInMap(xxx);
    }
  }

  public buildComponentsMap(... componentItems: ModuleRefDefinition[] | ComponentRefDefinition[]){
    for(let xxx of componentItems) {
      this.loadSingleNgComponentInMap(xxx);
    }
  }

  public buildAllMaps(moduleItems: ModuleRefDefinition[], compsItem:  ComponentRefDefinition[]){
    this.buildComponentsMap(...compsItem);
    this.buildModulesMap(...moduleItems);
  }



}
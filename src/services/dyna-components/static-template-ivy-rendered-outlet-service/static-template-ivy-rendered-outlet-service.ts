
/*

built reworking the S.O. answer:

https://stackoverflow.com/questions/60971689/how-to-dynamically-lazy-load-module-without-router-angular-9



original article was:

https://itnext.io/building-an-aot-friendly-dynamic-content-outlet-in-angular-c2790195cb94

this was better

https://indepth.dev/posts/1167/lazy-loading-angular-modules-with-ivy




the following two links are not good (before ivy)

- 1 -

https://medium.com/@matt.denobrega/for-those-of-you-who-implemented-this-and-are-getting-warnings-about-ngmodulefactoryloader-being-ae20ce1bca20

For those of you who implemented this and are getting warnings \
about NgModuleFactoryLoader being deprecated, it’s pretty simple to switch to the new pattern:

import('src/app/conversation/conversation.module').then(m => m.ConversationModule).then(conversationModule => {
    this._compiler.compileModuleAsync(conversationModule).then(ngModuleFactory => {
        this.moduleRef = ngModuleFactory.create(this._injector)
        const factory = this.moduleRef.componentFactoryResolver.resolveComponentFactory(conversationModule.rootComponent)
this.vcr.createComponent(factory)
    })
})

- 2 -

original sample was

https://netbasal.com/the-need-for-speed-lazy-load-non-routable-modules-in-angular-30c8f1c33093


*/

import {
  Compiler,
  ComponentFactoryResolver,
  Injectable,
  Injector,
  Type,
  /* NgModuleFactoryLoader,
  NgModuleFactory,
  NgModuleRef, */
  ViewContainerRef,
  ComponentFactory,
  ComponentRef
} from '@angular/core';
import { LazyCompsCacheService } from '../components-factories-cache-services/lazy-comps-cache.service';
import { ComponentRefDefinition, ModuleRefDefinition, NgModuleWithComponentBuilder, NgObjectsRefContainer } from '../components-factories-cache-services/types/lazy-cache.types';
import { LazyFilesService } from '../../../apps/simple-dyna-templates/services/lazy-files/lazy-files.service';


@Injectable({
  providedIn: 'root'
})
export class StaticTemplateIvyRenderedOutletService {


  // service constructor
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private _compiler:Compiler,
    private lazyFiles: LazyFilesService,
    private lazyCache: LazyCompsCacheService
  ) {

  }





  //
  // ==================================================================================================
  //
  // get component/module factories
  //

  private getComponentFactory(compName: string){
    const theComponent = this.lazyCache.getComponentInMap(compName);
    if (theComponent && theComponent.isReady) {
      if (!!theComponent.solvedFactory) {
        theComponent.solvedFactory = this.componentFactoryResolver.resolveComponentFactory(theComponent.solvedNgObj);
      }
      //
      return theComponent.solvedFactory;
    }
  }

  private getModuleFactory(moduleName: string): Promise<any> {
    const theModule = this.lazyCache.getModuleInMap(moduleName);
    if (theModule) {
      if (theModule.isReady) {
        if (!theModule.solvedFactory) {
          const moduleObj = theModule.solvedNgObj;
          const module = moduleObj[Object.keys(moduleObj)[0]];
          return  this._compiler.compileModuleAsync(module)
          .then(value => {
            theModule.solvedFactory = value;
            return value;
          })
          .catch(err => err);
        }
        //
        return new Promise((resolve,reject) => {
          resolve(theModule.solvedFactory);
        })
      }
      return new Promise((resolve, reject) => reject("module not ready after deferred loading") );
    }
    return new Promise((resolve, reject) => reject("module not found error") );
  }

  //
  // ==================================================================================================
  //
  // build component WITH a module
  //

  private _buildComponentWithModule(compName: string, moduleName: string){ // _out
    //
    return this.getModuleFactory(moduleName)
    .then (moduleFactory => {
      const moduleRef = moduleFactory.create(this.injector);
      const componentFactory = (moduleRef.instance as NgModuleWithComponentBuilder).resolveComponent(compName);
      return({componentFactory, moduleRef});
    })
    .catch( 
      error => {
        return {componentFactory: null, moduleRef: null, error: error, errMessage: "no component factory for component " + compName}
      }
    );

  }

  // cast dynamic component WITH accompanying module
  public drawComponentWithModuleInViewRef( moduleName: string | null, defaultmmoduleName: string, compName: string, viewRef: ViewContainerRef, generatedResourceId = 0): Promise<ComponentRef<unknown>> {
    // build returned wrapping promise
    if (moduleName === null) {
      const componentDefs: ComponentRefDefinition = this.lazyFiles.getComponentRef(compName) as ComponentRefDefinition;
      moduleName = (componentDefs || {}).ngObjNeededModule ?? defaultmmoduleName;
    }
    const wrappingPromise = new Promise<ComponentRef<unknown>>((resolve,reject) => {
      // get modules and component containers
      const theModule: ModuleRefDefinition | undefined = this.lazyFiles.getModuleRef(moduleName!);
      if (!!theModule) {
        const theComponent: ComponentRefDefinition | undefined = this.lazyFiles.getComponentRef(compName) || this.lazyFiles.getComponentRef("dynamicContentOutletErrorComponent");
        if (!!theComponent) {
          const promMod = this.lazyCache.resolveModuleObj(theModule)();
          const promComp = this.lazyCache.resolveComponentObj(theComponent)();
          Promise.all([promMod, promComp])
          .then( items => {
            const stpOne: Promise<any> = this._buildComponentWithModule(compName, moduleName!)
            .then((componentFactoryContainer: any)  => {
                const ref: ComponentRef<unknown> = viewRef.createComponent(componentFactoryContainer.componentFactory, generatedResourceId, componentFactoryContainer.moduleRef.injector);
                resolve(ref);
              }        
            )
            .catch(error => {
              console.log("lazy loader failed on level 2 with error", error);
              reject(error);
            })
          })
          .catch(error => {
            console.log("lazy loader failed on level 1 with error", error);
            reject(error)
          });
  
        } else {
          console.log("TODO:manage component badly not found error");
          reject("TODO:manage component badly not found error");
        }
  
      } else {
        console.log("TODO:manage module badly not found error");
        reject("TODO:manage module badly not found error");
      }
  });
    return wrappingPromise;
  }

  //
  // ==================================================================================================
  //
  // build component WITHOUT a module
  //

  public putSimpleComponentInRef(compName: string, viewRef: ViewContainerRef){
    const compFactory = this.getComponentFactory(compName);
    const { instance } = viewRef.createComponent(compFactory);
    return instance;
  }




// ===============================================================



}

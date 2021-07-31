
//
//
//
// 20210709 - ssr with headless chrome
// https://developers.google.com/web/tools/puppeteer/articles/ssr
//
// 20210709 - articles and threads about jit+aot in production mode
//
//   fairly old article on the problem (angular 4)
// https://github.com/angular/angular-cli/issues/9306
//   as above but on angular 5
// https://stackoverflow.com/questions/49249919/angular-aot-and-jit-on-same-project
//
//   same problem in angular 9
// https://github.com/angular/angular-cli/issues/17947
// https://github.com/angular/angular/issues/35788
//    further discussion
// https://github.com/angular/angular-cli/issues/17663
//     one of the most recent
// https://github.com/angular/angular/issues/15275     (still alive)
//    SO on dynamic componets, quick coockbook
// https://stackoverflow.com/questions/46576727/angular-compile-and-create-components-at-runtime
//   indepth on component factories
// https://indepth.dev/posts/1054/here-is-what-you-need-to-know-about-dynamic-components-in-angular
//   build optimizer source line to be removed for optimiser working... the line number 28
// https://github.com/angular/angular-cli/blob/11.2.x/packages/angular_devkit/build_optimizer/src/build-optimizer/build-optimizer.ts
//   reduce javascript payload with threeshaking
// https://developers.google.com/web/fundamentals/performance/optimizing-javascript/tree-shaking/
//
//
//
//
//
//  20210709 - esm vs cjs vs amd vs umd
// https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm
//
//  20210709 - about angular strict mode
//  https://blog.angular.io/angular-cli-strict-mode-c94ba5965f63
//
//
// 20210601 - old article about dynamic template compilation
// https://www.linkedin.com/pulse/compiling-angular-templates-runtime-dima-slivin/
//
// 20210601 - problem with parent injector (not solved)
// https://stackoverflow.com/questions/57297628/dynamically-created-modules-and-components-dont-have-access-to-parent-injector
//
// 20210601 - possible way to build the injector.. however, I'd say it is similar to my way:
// https://developer.fireflysemantics.com/tasks/tasks--angular--creating-a-dynamic-component-with-a-custom-injector
//
// 20210601 - reflective injector deprecated
// https://medium.com/angular-in-depth/angular-introduces-staticinjector-should-you-care-4e059eca030c
//
//
import { CommonModule } from '@angular/common';
import { Compiler, ComponentFactory, ComponentRef, Injectable, Injector, NgModule, ReflectiveInjector, ViewContainerRef, ModuleWithComponentFactories, NgModuleRef, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { DesanitizerPipe } from 'src/filters/DesanitizerPipe';
import { AppRoutingModule } from 'src/app/app-routing.module';
// import { SandboxModule } from 'src/app/sandbox/sandbox.module';


// import { HomeDynaSoftComponent } from 'src/app/apps/wscprinter/components/cms/homepage/sys/home.component';


//quoting

@Injectable({
  providedIn: 'root'
})
export class DynamicTemplateIvyRenderedOutletService {
  useAppModuleFlag: boolean = false;

  constructor(private compiler: Compiler) {
    this.useAppModuleFlag = false;
  }

  async generateDynamic(component: any): Promise<ComponentFactory<any> | null> {
    this.compiler.clearCache();

    const type = component;

    const module: /*NgModuleRef<AppModule> | */ Type<unknown> = this.generateNewModule(type);

    return new Promise(
      (resolve, reject) => {
        this.compiler.compileModuleAndAllComponentsAsync(module)
          .then(
            (factories: ModuleWithComponentFactories<unknown>) => {
              const componentFactory : ComponentFactory<any> | undefined =
                factories.componentFactories
                .find((x : ComponentFactory<any>) => {
                  return x.componentType === component;
                });
              if (componentFactory) {
                // componentFactory.
                resolve(componentFactory)
              } else {
                reject(new Error("KO: no component factory founded for component " + component.name ));
              }
            },
            (error) => reject(error)
          );
      });

  }


  async generateDynamicAndPut(containterRef: ViewContainerRef, component: any): Promise<any> {
    const prommy: Promise<any> = await new Promise<any>(
      (resolve, reject) => {
        this.generateDynamic(component)
          .then(
            (componentFactory : ComponentFactory<any> | null ) => {
              if (componentFactory) {
                const cmpRef: ComponentRef<any> = containterRef.createComponent(componentFactory!,0, AppModule.injector!); // , 0);

                this.compiler.clearCache();
                componentFactory = null;
                resolve({status: 'OK', bStatus: true, desc: "DynaCompOtfcService.generateDynamicAndPut created the object", errObj: {}, componentRef: cmpRef });
              } else {
                reject({status: 'KO', bStatus: false, desc: "DynaCompOtfcService.generateDynamicAndPut FAILED-1 object creation", errObj: new Error("null component factory generated"), componentRef: undefined})
              }
            },
            (error) => reject({status: 'KO', bStatus: false
                        , desc: `DynaCompOtfcService.generateDynamicAndPut FAILED-2 object creation\n ${(error || {message: "null err"}).message}`, errObj: error, componentRef: undefined})
          )
      }
    );
    return prommy;
  }

  //
  // for tests ...
  //
  private modeInReflectiveInjector: boolean = false;
  private custInjector: CustInjector = new CustInjector();

  async generateDynamicAndPut_4Test(containterRef: ViewContainerRef, component: any): Promise<any> {
    const prommy: Promise<any> = await new Promise<any>(
      (resolve, reject) => {
        this.generateDynamic(component)
          .then(
            (componentFactory) => {
              if (componentFactory) {
                if (this.modeInReflectiveInjector) {
                  const pippaInjector = this.generateInjector_Example();
                  pippaInjector
                  .then(
                    resultInj => {
                      const cmpRef: ComponentRef<any> = containterRef.createComponent(componentFactory!,0, resultInj /* AppModule.injector!*/); // , 0);

                      this.compiler.clearCache();
                      componentFactory = null;
                      resolve({status: 'OK', bStatus: true, desc: "DynaCompOtfcService.generateDynamicAndPut created the object", errObj: {}, componentRef: cmpRef });
                    }
                  )
                  , (err: any) => {
                    reject({status: 'KO', bStatus: false, desc: "DynaCompOtfcService.generateDynamicAndPut FAILED-3 injector creation", errObj: new Error("null component factory generated " + (err || {message :"err null!!"}).message ), componentRef: undefined})
                  };
                } else {
                  const cmpRef: ComponentRef<any> = containterRef.createComponent(componentFactory!,0, AppModule.injector! /* this.custInjector! */); // , 0);

                  this.compiler.clearCache();
                  componentFactory = null;
                  resolve({status: 'OK', bStatus: true, desc: "DynaCompOtfcService.generateDynamicAndPut created the object", errObj: {}, componentRef: cmpRef });
                }
              } else {
                reject({status: 'KO', bStatus: false, desc: "DynaCompOtfcService.generateDynamicAndPut FAILED-1 object creation", errObj: new Error("null component factory generated"), componentRef: undefined})
              }
            },
            (error) => reject({status: 'KO', bStatus: false
                        , desc: `DynaCompOtfcService.generateDynamicAndPut FAILED-2 object creation\n ${(error || {message: "null err"}).message}`, errObj: error, componentRef: undefined})
          )
      }
    );
    return prommy;

  }

  // this was a study ... come back sometimes... 20210528
  private async generateInjector_Example(){
    const rtt = AppModule.injector!.get(Router);
    const injector: Injector = ReflectiveInjector.resolveAndCreate(
      [
        {
          provide: 'config',
          useValue: {
            value: 'Any value or object here'
          }
        }
        , {
          provide: 'Router',
          useValue: {
            value: rtt
          }
        }
      ]
      , AppModule.injector! // in the original example was null...
    );
    return injector;
  }
  //  Private Methods
  //
  //
  // WARNING: ES - 20210528
  //
  private generateNewModule(componentType: any): /*NgModuleRef<AppModule> |*/ Type<unknown>  {
    // Define the module using NgModule decorator.
    const module : /* NgModuleRef<AppModule> | */ Type<unknown> =
      this.useAppModuleFlag ?
        AppModule
      :
        NgModule({
          declarations: [ Router, RouterModule, componentType
            , DesanitizerPipe]
          , imports: [CommonModule, FormsModule, RouterModule
            , AppRoutingModule] // , AppModule
          , exports: [ Router, AppRoutingModule, RouterModule, DesanitizerPipe]
          , bootstrap: [Router]
        })(class { });

    return module;
  }
}


export class CustInjector extends Injector{
  private innerInj: Injector | null;

  constructor(){
    super();
    this.innerInj = AppModule.injector;
  }
  public get(arg: any): any {
    return this.innerInj!.get<any>(arg);
  }
}

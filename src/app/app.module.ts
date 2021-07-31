import { CommonModule } from '@angular/common';
import { Compiler, CompilerFactory, COMPILER_OPTIONS, Injector, NgModule, NgModuleRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';

import { IsBrowserIsNodeService } from 'src/services/is-browser-is-node-service/is-browser-is-node.service';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { BoilerplateHomeComponent } from 'src/apps/ng-cli-bp/pages/boilerplate-home/boilerplate-home.component';
import { AngularAdsComponent } from 'src/apps/ng-cli-bp/pages/angular-ads/angular-ads.component';
import { DynamicTemplateViaFactoryComponent } from 'src/apps/simple-dyna-templates/pages/dynamic-template-via-factory/dynamic-template-via-factory.component';


import { DynaButtonComponent } from 'src/apps/simple-dyna-templates/comps-mods/eager-components/dyna-button/dyna-button.component';
import { DynaLabelComponent } from 'src/apps/simple-dyna-templates/comps-mods/eager-components/dyna-label/dyna-label.component';
import { JitComponentSelectorComponent } from 'src/apps/simple-dyna-templates/pages/dynamic-template-via-factory/component-selector/jit-component-selector.component';
import { DesanitizerPipe } from 'src/filters/DesanitizerPipe';
import { GenericCustomFilter } from 'src/filters/genericCustomFilter';
import { PageNotFoundComponent } from 'src/apps/ng-cli-bp/pages/page-not-found/page-not-found.component';
import { BoilerPlateMainNavbarComponent } from 'src/apps/ng-cli-bp/pages/components/nav-bars/boiler-plate-main-navbar/boiler-plate-main-navbar.component';
import { BoilerPlateMainNavbarButton001Component } from 'src/apps/ng-cli-bp/pages/components/nav-bars/navigators/boiler-plate-main-navbar-button001/boiler-plate-main-navbar-button001.component';
import { BoilerPlateMainNavbarRouteEcho001Component } from 'src/apps/ng-cli-bp/pages/components/nav-bars/navigators/boiler-plate-main-navbar-route-echo001/boiler-plate-main-navbar-route-echo001.component';


//
// compiler factory
// https://github.com/angular/angular/issues/35788
// https://stackoverflow.com/questions/49249919/angular-aot-and-jit-on-same-project
//
export function createCompiler(compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler();
}


@NgModule({
  declarations: [
    // app radix...
    AppComponent,

    // filters
    GenericCustomFilter,
    DesanitizerPipe,

    // pages
    BoilerplateHomeComponent,
    BoilerPlateMainNavbarButton001Component,
    BoilerPlateMainNavbarRouteEcho001Component,
    AngularAdsComponent,
    DynamicTemplateViaFactoryComponent,
    PageNotFoundComponent,

    // components
    BoilerPlateMainNavbarComponent,
    DynaButtonComponent,
    DynaLabelComponent,
    JitComponentSelectorComponent



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule, 
    FormsModule,
  ],
  providers: [
    IsBrowserIsNodeService
    // Compiler is not included in AOT-compiled bundle.
    // Must explicitly provide compiler to be able to compile templates at runtime.
    ,{ provide: COMPILER_OPTIONS, useValue: {}, multi: true }
    ,{ provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS] }
    ,{ provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  //
  //
  // https://stackoverflow.com/questions/57055895/get-injector-from-module-in-angular-8
  //
  public static injector: Injector | null= null;
  public static instance: AppModule; // AppModule; // NgModule;
  public static instanceModule: NgModuleRef<AppModule>; // AppModule; // NgModule;



  constructor(/*private metadataService: MetadataService, */private injector: Injector /*, private translate: TranslateService */){
    AppModule.injector = injector;
    // this.metadataService.isRoot = true;
    console.log("app module constructor");
    AppModule.instance = this;



  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularAdsComponent } from 'src/apps/ng-cli-bp/pages/angular-ads/angular-ads.component';
import { BoilerplateHomeComponent } from 'src/apps/ng-cli-bp/pages/boilerplate-home/boilerplate-home.component';
import { PageNotFoundComponent } from 'src/apps/ng-cli-bp/pages/page-not-found/page-not-found.component';
import { DynamicTemplateViaFactoryComponent } from 'src/apps/simple-dyna-templates/pages/dynamic-template-via-factory/dynamic-template-via-factory.component';

const routes: Routes = [
  {
    path:'',
    component: BoilerplateHomeComponent,
  }
  , {
    path:'home',
    component: BoilerplateHomeComponent,
  }
  , {
    path:'boilerplateHome',
    component: BoilerplateHomeComponent,
  }
  , {
    path:'angularAds',
    component: AngularAdsComponent,
  }
  , {
    path:'dynaComponentsTest',
    component: DynamicTemplateViaFactoryComponent,
  }








  , {
    path:'**',
    component: PageNotFoundComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

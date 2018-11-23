import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {
    path:'',
   // component:LandingPageComponent,
  
    children:[

      {
        path:'',
       // loadChildren:'./stocklist/stocklist.module#StocklistModule',
       component:LandingPageComponent

      },
     /* {
        path:'**',
        loadChildren:'./not-found/not-found/not-found.module#NotFoundModule'

      },*/

      {
        path:'stock',
        loadChildren:'./stocklist/stocklist.module#StocklistModule'
      },
      {
        path:'bill',
        loadChildren:'./billing/billing.module#BillingModule'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardContainerComponent } from './container/dashboard-container/dashboard-container.component';
import{ Material704Module} from '../material-7-0-4/material-7-0-4.module';
import { Routes, RouterModule } from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { BillingDetailsViewComponent } from './component/billing-details-view/billing-details-view.component';
import {MatTabsModule} from '@angular/material/tabs';
const ROUTES: Routes = [
  {
    path:'',
   // component:DashboardContainerComponent, 


    children:[
      {
       path:'',
       //loadChildren: 'BillingDetailsViewComponent'
       component:DashboardContainerComponent, 
      }
     
    ] 
  }
  
    ]

@NgModule({
  declarations: [DashboardContainerComponent, BillingDetailsViewComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    Material704Module,
    RouterModule.forChild(ROUTES)
  ],
  exports:[
    DashboardContainerComponent,
    BillingDetailsViewComponent
  ]
})
export class DashboardModule { }

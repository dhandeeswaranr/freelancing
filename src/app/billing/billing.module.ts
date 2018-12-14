import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingContainerComponent } from './container/billing-container/billing-container.component';
import { Routes, RouterModule } from '@angular/router';
import { BillViewComponent } from './components/bill-view/bill-view.component';
import{ Material704Module} from '../material-7-0-4/material-7-0-4.module';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

const ROUTES: Routes = [
  {
    path:'',
    component:BillingContainerComponent, 
  },
    ]
@NgModule({
  declarations: [BillingContainerComponent, BillViewComponent],
  imports: [
    CommonModule,
    Material704Module,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(ROUTES)
  ],
  exports:[
    BillingContainerComponent,
    //ROUTES
  ]
})
export class BillingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingContainerComponent } from './container/billing-container/billing-container.component';
import { Routes, RouterModule } from '@angular/router';

const ROUTES: Routes = [
  {
    path:'',
    component:BillingContainerComponent, 
  },
    ]
@NgModule({
  declarations: [BillingContainerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  exports:[
    BillingContainerComponent,
    //ROUTES
  ]
})
export class BillingModule { }

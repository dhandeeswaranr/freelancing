import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotFoundContianerComponent } from '../container/not-found-contianer/not-found-contianer.component';
import { NotFoundPageComponent} from '../component/not-found-page/not-found-page.component';
import { Routes, RouterModule } from '@angular/router';
const ROUTES: Routes = [
  {
    path:'',
    component:NotFoundContianerComponent,
        
  }
]
@NgModule({
  declarations: [
    NotFoundContianerComponent,
    NotFoundPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  exports:[
    NotFoundContianerComponent,
    NotFoundPageComponent,
  ]
})
export class NotFoundModule { }

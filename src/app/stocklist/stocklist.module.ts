import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockContainerComponent } from './container/stock-container/stock-container.component';
import { Routes, RouterModule } from '@angular/router';
import { StockEntryComponent } from './components/stock-entry/stock-entry.component';
import{ Material704Module} from '../material-7-0-4/material-7-0-4.module';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireModule} from 'angularfire2';
import {environment } from '../../environments/environment';
import {CommonService } from '../service/common.service';
import { StocAddComponent } from './components/stoc-add/stoc-add.component';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StockUpdateComponent } from './components/stock-update/stock-update.component';
import {CommunicationService } from '../service/communication.service';
const ROUTES: Routes = [
  {
    path:'',
    component:StockContainerComponent,
        
  }
    ]

@NgModule({
  declarations: [StockContainerComponent, StockEntryComponent, StocAddComponent, StockUpdateComponent],
  imports: [
    CommonModule,
    Material704Module,
    ReactiveFormsModule,
    FormsModule,
   AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    RouterModule.forChild(ROUTES)
  ],
  exports:[
    StockContainerComponent,
    StockEntryComponent,
    StocAddComponent,
    //ROUTES
  ],
  providers:[CommonService, CommunicationService],
  entryComponents:[StocAddComponent, StockUpdateComponent]
})
export class StocklistModule { }

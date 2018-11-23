import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService} from '../../../service/common.service';
import { CommunicationService} from '../../../service/communication.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker'
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Subscription } from 'rxjs';

import { toDate } from '@angular/common/src/i18n/format_date';
@Component({
  selector: 'app-stock-update',
  templateUrl: './stock-update.component.html',
  styleUrls: ['./stock-update.component.scss']
})
export class StockUpdateComponent implements OnInit, OnDestroy {
  ProductForm:FormGroup;
  subscription: Subscription;
  message:any;
  stockData=[];
  keyCode:any;
  currentUID:any;
  currentPID:any;
  currentPDATE:Date;
  currentPNAME:any;
  currentPQUAN:any;
  currentPPRICE:any;
  currentPGST:any;
  currentPTOT:any;
  events: string[] = [];
  constructor(private formBuilder: FormBuilder, private commonService:CommonService, private communication:CommunicationService) {
   // this.subscription = this.communication.getMessage()
    
    
   }
  formCntrl(){
    this.ProductForm = this.formBuilder.group({
      $key:[,''],
      product_GST:[null,],
      product_UID:[null,],
      product_ID:[null,],
      purchase_Date:[null,],
      product_Name:[null,],
      product_Quantity:[0,],
      product_Price:[0,],
      product_Total:[null,]
  
    })
  }
  ngOnInit() {
    this.formCntrl();
    this.pageOnLoad();
    this.subscription = this.communication.getMessage().subscribe(
      message => {this.message = message}
    )
    //this.currentPDATE.toDateString;
    this.message = this.communication
    console.log("got" +JSON.stringify(this.message.keyVal))
    this.keyCode = this.message.keyVal
    console.log("uid" + this.message.id)
    this.currentUID = this.communication.id;
    this.currentPID = this.communication.pid;
    this.currentPDATE = this.communication.pdate;
    this.currentPNAME = this.communication.pname;
    this.currentPQUAN = this.communication.pquan;
    this.currentPPRICE = this.communication.pprice;
    this.currentPGST = this.communication.pgst;
    this.currentPTOT = this.communication.ptot;
    
    console.log("date" +this.currentPDATE.toDateString, );
  }
  pageOnLoad()
  {
    this.commonService.getStockData().subscribe(
      stockData => 
      {
        this.stockData = stockData.map(
          stockList =>
          {
            console.log("working" + stockData);
            return {
              $Key:stockList.key,
              ...stockList.payload.val()
            }
          });
            
         // this.dataSource = new MatTableDataSource(this.stockData);
         // this.dataSource.paginator = this.paginator;
        //  this.pageLength = this.stockData.length;
        
      }
    )
  }
  submitData(){
    console.log("UPDATEDATA" + JSON.stringify(this.ProductForm.value));
    
    this.commonService.updateStock(this.keyCode, this.currentUID, this.currentPDATE, this.ProductForm.value);
    
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    //this.currentPDATE = event.value;
    this.ProductForm.value.purchase_Date = event.value.toDateString();
   console.log("add eve" +  this.ProductForm.value.purchase_Date)
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
  //  this.subscription.unsubscribe();
}
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService} from '../../../service/common.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker'
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-stoc-add',
  templateUrl: './stoc-add.component.html',
  styleUrls: ['./stoc-add.component.scss']
})
export class StocAddComponent implements OnInit {
  ProductForm:FormGroup;
  UID:number;
  purchaseDate:Date;
  events: string[] = [];
  PurDate:any;
  defaultQuantity:number = 0;
  defaultPrice:number = 0;
  defaultGST:number = 0;
  totalPrice:number = 0;


  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.purchaseDate = event.value;
   
  }

  constructor(private formBuilder: FormBuilder, private commonService:CommonService) { }

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
    this.UID =  Math.floor(1000 + Math.random() * 9000);
  }


  submitData(){
    
    this.ProductForm.value.product_UID = this.UID;
    this.ProductForm.value.purchase_Date = this.purchaseDate.toDateString();
   //this.ProductForm.value.purchase_Date = this.PurDate;
    console.log("date" + this.ProductForm.value.purchase_Date);
    this.commonService.postStockData(this.ProductForm.value);
    this.ProductForm.reset();

  }

  getQuantity(event){
    console.log("Quantity" +event.target.value)
    this.defaultQuantity = parseInt(event.target.value) ;
   // this.totalPrice = this.defaultQuantity * this.defaultPrice
    //this.ProductForm.value.product_Total =  this.totalPrice
    this.totalPrice = ((this.defaultQuantity * this.defaultPrice) * (this.defaultGST/100)) + (this.defaultQuantity * this.defaultPrice) 
  }
  getProducPrice(event){
    console.log("Price" +event.target.value)
    this.defaultPrice = parseInt(event.target.value)
   // this.totalPrice = this.defaultQuantity * this.defaultPrice
   this.totalPrice = ((this.defaultQuantity * this.defaultPrice) * (this.defaultGST/100)) + (this.defaultQuantity * this.defaultPrice) 
   // this.ProductForm.value.product_Total =  this.totalPrice
  }
  getGST(event){
    this.defaultGST = parseInt(event.target.value);
    this.totalPrice = ((this.defaultQuantity * this.defaultPrice) * (this.defaultGST/100)) + (this.defaultQuantity * this.defaultPrice) 
  }
}

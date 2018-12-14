import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog} from '@angular/material';
import { CommonService} from '../../../service/common.service';
import{FormControl, FormGroup, FormBuilder, AbstractControl, FormArray } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import {formatDate } from '@angular/common';
@Component({
  selector: 'bill-view',
  templateUrl: './bill-view.component.html',
  styleUrls: ['./bill-view.component.scss']
})
export class BillViewComponent implements OnInit {
  billData = [];
  BID
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild('formBilling') FormData;
  //dataSource :MatTableDataSource<any>;
  
  private newAttribute: any = {};
  private fieldArray: Array<any> = [];

  //
  billDetail =[];
  data:BillElement[] = [{Index: null, productID: null , stockName: "", stockQuan:"", stockPrice: null, stockGST:null  }]
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  displayedColumns: string[] = ['Index',  'productID', 'stockName', 'stockQuan', 'stockPrice','stockGST', 'stockTotal', 'actions'];
  rows: FormArray = this.formBuilder.array([]);
  today= new Date();
  formBilling:FormGroup = this.formBuilder.group({
    BID:this.BID,
    Date:formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530'),
    billArray:this.rows
  });
  //

  
  constructor(private service:CommonService, private formBuilder:FormBuilder) { }

  formValidation(){
    
    this.formBilling = this.formBuilder.group({
     /* Bill_Product_ID:[''],
      Bill_Product_Name:[''],
      Bill_Product_Quantity:[''],
      Bill_Product_Per_Price:[''],
      Bill_Product_GST:[]*/
      billArray: this.formBuilder.array([this.createbillArray()])
     
    })
  }

  createbillArray() {
    return this.formBuilder.group({
      Bill_Product_ID:['',[]],
      Bill_Product_Name:['',[]],
      Bill_Product_Quantity:['',[]],
      Bill_Product_Per_Price:['',[]],
      Bill_Product_GST:['',[]],
      
     
    });
  }

  ngOnInit() {
    this.BID =  Math.floor(10000 + Math.random() * 9000);
    //this.formValidation();
    //
    this.updateView();
    this.data.forEach((d: BillElement) => this.addRow(d, false));
    this.formBilling = this.formBuilder.group({
      BID:this.BID,
      Date:formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530'),
      billArray:this.rows
    });
    this.pageOnLoad();
  }

  pageOnLoad()
  {
    this.service.getBillData().subscribe(
      billDetail => 
      {
        this.billDetail = billDetail.map(
          
          stockList =>
          {
            console.log("working" + billDetail);
            
            return {
              $Key:stockList.key,
              ...stockList.payload.val()
            }
          });

         // this.dataSource = new MatTableDataSource(this.billDetail);
          //this.dataSource.paginator = this.paginator;
          //this.pageLength = this.billDetail.length;
          
       // console.log("da" + this.dataSource.data )
        
     // console.log("tt" +m.stockPrice);
      }
    )
  }
  add(){
    ELEMENT_DATA1.push({Index: 1, productID: 4 , stockName: "dhandy", stockQuan:"", stockPrice: 1.0079, stockGST:null })
   // this.dataSource = new MatTableDataSource(ELEMENT_DATA1);
  }
  bill(formBilling){
  console.log("form"+formBilling)
  console.log("value"+this.formBilling.value)

  this.service.postBillData(this.formBilling.value)
  }
  //
  updateView() {
    this.dataSource.next(this.rows.controls);
  }
  row:any
  addRow(d?: BillElement, noUpdate?: boolean) {
     this.row = this.formBuilder.group({
      'Index':[],
      'productID'   : [d && d.productID ? d.productID : null, []],
      'stockName'     : [d && d.stockName   ? d.stockName   : null, []],
      'stockQuan':[],
      'stockPrice':[],
      'stockGST':[]
    });
    this.rows.push(this.row);
    
    if (!noUpdate) { this.updateView(); }
  }

  removeRow(){
   // this.rows.removeAt(row);
   this.row.removeRow(1)
   
  }
  emptyTable(index) {
    //this.row.removeRow;
   
    this.rows.removeAt(index);
    console.log("ees" + this.rows.length, )
    //this.dataSource.d
    /*this.rows.removeAt(0);
    while (this.rows.length !== 0) {
      this.rows.removeAt(0);
    }*/
     this.updateView(); 
  }
}
export interface BillElement {
  Index: number;
  productID: number;
  stockName: string;
  stockQuan: string;
  stockPrice:number;
  stockGST:number;
}
export interface Element {
  Index: any;
  productID: number;
  stockName: string;
  stockQuan: string;
  stockPrice:number;
  stockGST:number;
}
const ELEMENT_DATA1: Element[] = [
 
];
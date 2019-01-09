import { Component, OnInit, ViewChild, ChangeDetectionStrategy  } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY} from '@angular/material';
import { CommonService} from '../../../service/common.service';
import{FormControl, FormGroup, FormBuilder, AbstractControl, FormArray, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import {formatDate } from '@angular/common';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators'
@Component({
  selector: 'bill-view',
  templateUrl: './bill-view.component.html',
  styleUrls: ['./bill-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillViewComponent implements OnInit {
  billData = [];
  BID
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('formBilling') FormData;
  //dataSource :MatTableDataSource<any>;
  
  private newAttribute: any = {};
  private fieldArray: Array<any> = [];

  //
  billDetail =[];
  data:BillElement[] = [{Index: null, productID: null , stockName: "", stockQuan: 0, stockPrice: 0, stockGST:null, ItemTotalPrice:null  }]
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  displayedColumns: string[] = ['Index',   'stockName', 'stockQuan', 'stockPrice', 'stockTotal', 'actions'];
  rows: FormArray = this.formBuilder.array([]);
  today= new Date();
  formBilling:FormGroup = this.formBuilder.group({
    BID:this.BID,
    Date:formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530'),
    TotalBillValue:'',
    billArray:this.rows
  });
  currentDate;
  stockData = [];
  filteredStates:Observable<any[]>
  nameOfStock=[];
  productNames = new FormControl();
  productIDs = new FormControl();
  entryData=[];
  testQuan = [];
  //

 
  constructor(private service:CommonService, private formBuilder:FormBuilder) {
   
   }

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
      productID:['',[]],
      Bill_Product_Name:['',[]],
      stockQuan:[0,[Validators.required]],
      Bill_Product_Per_Price:['',[]],
      Bill_Product_GST:['',[]],
      
     
    });
  }

  ngOnInit() {
    this.BID =  Math.floor(10000 + Math.random() * 9000);
    
    //
    //this.formValidation();
    //
    this.currentDate = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
    this.updateView();
    this.data.forEach((d: BillElement) => this.addRow(d, false));
    this.formBilling = this.formBuilder.group({
      BID:this.BID,
     // TotalBillValue:this.getTotalCost(),
      Date:formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530'),
      billArray:this.rows
    });
    this.pageOnLoad();
    this.productDataDetails();
    
   // parseInt(this.getTotalCost(0));
    
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
    ELEMENT_DATA1.push({Index: 1, productID: 4 , stockName: "dhandy", stockQuan: 0, stockPrice: 1.0079, stockGST:null, ItemTotalPrice:null })
   // this.dataSource = new MatTableDataSource(ELEMENT_DATA1);
  }
  bill(formBilling){
  this.entryData = formBilling;
  console.log("value"+JSON.stringify(this.formBilling.value))
  console.log("Array"+formBilling.billArray.length)
  for(let a of this.stockData){
   // console.log("a dat" +a.productName)
    /*if(a.productName == formBilling.billArray.productName){
      console.log("same :" +a.productName)
    }*/
    for(let b of formBilling.billArray){
      //console.log("same :" +b.productName)
      if(b.productName == a.productName){
        console.log("form :" +b.productName)
        console.log("form Quan"+b.stockQuan)
        console.log("stock :" +a.productName)
        console.log("stock :" +a.productQunatity)
        console.log (a.$Key  +" Current quantity " +a.productName+ " of" +(a.productQunatity - b.stockQuan )+ "/" +a.productQunatity)
        a.productQunatity = (a.productQunatity - b.stockQuan )
        console.log("updat Quan" +a.productQunatity)
        console.log("Current Stock" +JSON.stringify(a))
        this.service.updateStockBill(a.$Key, a)
      }
    }
  }  

   
  
  this.service.postBillData(this.formBilling.value, this.GstPlusTot)
  this.print();
  setTimeout(()=>{    //<<<---    using ()=> syntax
   this.formBilling.reset();
   this.BID =  Math.floor(10000 + Math.random() * 9000);
    
    //
    //this.formValidation();
    //
    this.currentDate = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
    }, 1500);
  }
  //
  updateView() {
    this.dataSource.next(this.rows.controls);
  }
  row:any
  addRow(d?: BillElement, noUpdate?: boolean) {
    productIDs:'';
     this.row = this.formBuilder.group({
      'Index':[],
      'productID'   : [d && d.productID ? d.productID : null, []],
      /*'stockName'     : [d && d.stockName   ? d.stockName   : null, []],*/
     // 'productID':[],
      'productName':[],
      'stockQuan':[0, Validators.required],
      'stockPrice':[0, Validators.required],
      'stockGST':[0],
      'ItemTotalPrice':[0]
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

  productDataDetails()
  {
    this.service.getStockData().subscribe(
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

                
      console.log("tt" +JSON.stringify(this.stockData) );
      })
 
  }
TotalPrice=[0];
quantityValue:number;
pricePerItem:number;
  quantity(event){
    console.log("lent" +event.billArray.length);
    
     /* for(var i=0; i<=event.billArray.length; i++){
        console.log(event.billArray[i].stockQuan);
        event.billArray[i].ItemTotalPrice = event.billArray[i].stockQuan * event.billArray[i].stockPrice;
        console.log("totla"+event.billArray[i].ItemTotalPrice)
        this.TotalPrice[i] = event.billArray[i].ItemTotalPrice
        console.log("array tot"+this.TotalPrice[i])
        
      }*/
  //event.billArray[0].ItemTotalPrice = event.billArray[0].stockQuan * event.billArray[0].stockPrice;
    
  }
  price(event){
    
    for(var i=0; i<=event.billArray.length; i++){
      event.billArray[i].ItemTotalPrice = parseInt(event.billArray[i].stockQuan)  * event.billArray[i].stockPrice;
      console.log("totla"+event.billArray[i].ItemTotalPrice)
     this.TotalPrice[i] = event.billArray[i].ItemTotalPrice
      console.log("array tot"+this.TotalPrice[i])
  
    }
   //this.getTotalCost();
  }
  GstTot:number = 0;
  BillTot:number = 0;
  GstPlusTot:number = 0;
  getTotalCost(e) {
    console.log("get" +e)
    if(e == 0 || e == 'undefined'){
      return 0;
    }
   else{
     this.GstTot = this.TotalPrice.reduce((acc,value) => acc + value, 0) * (18/100);
     this.BillTot = this.TotalPrice.reduce((acc,value) => acc + value, 0);
    this.GstPlusTot = this.TotalPrice.reduce((acc,value) => acc + value, 0) + this.GstTot;
    return this.TotalPrice.reduce((acc,value) => acc + value, 0) + this.GstTot
   }
    
  //  return this.billData.map(t => t.ItemTotalPrice).reduce((acc, value) => acc + value, 0);
  }

    GetProductDetails(event, $key)
    {
      console.log("PRODUCT DETAILS"+event.option.value)
   
        /*for(var i=0; i<=this.stockData.length; i++)
        {
            if(this.stockData[i].productName == event.option.value)
            {
              console.log("Product Quan"+this.stockData[i].productName)
              console.log("Product Quan"+this.stockData[i].productQunatity)
              console.log("Product Key"+this.stockData[i].$Key)
              
            }
        }*/
        
        
    }
    print(): void {
      let printContents, popupWin;
      printContents = document.getElementById('print-section').innerHTML;
      popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
      popupWin.document.open();
      popupWin.document.write(`
        <html>
          <head>
            <title>Print tab</title>
            <style>
            //........Customized style.......
            </style>
          </head>
      <body onload="window.print();window.close()">${printContents}</body>
        </html>`
      );
      popupWin.document.close();
    }

    reset(){
      this.formBilling.reset();
      this.BID =  Math.floor(10000 + Math.random() * 9000);
      this.currentDate = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');

    }

/** End of Class **/    
}
export interface BillElement {
  Index: number;
  productID: number;
  stockName: string;
  stockQuan: number;
  stockPrice: number;
  stockGST:number;
  ItemTotalPrice:number;
}
export interface Element {
  Index: any;
  productID: number;
  stockName: string;
  stockQuan: number;
  stockPrice:number;
  stockGST:number;
  ItemTotalPrice:number;
}
const ELEMENT_DATA1: Element[] = [
 
];
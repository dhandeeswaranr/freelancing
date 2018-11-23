import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, snapshotChanges } from 'angularfire2/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private firebase:AngularFireDatabase) { }
  stock:AngularFireList<any>;
billerModel:AngularFireList<any>;

stockForm = new FormGroup({
  $key:new FormControl(null),
  product_GST:new FormControl(''),
  product_UID:new FormControl(''),
  purchase_Date:new FormControl(''),
  product_ID:new FormControl(''),
  product_Name:new FormControl(''),
  product_Quantity:new FormControl(''),
  product_Price:new FormControl(''),
  product_Total:new FormControl('')
  
})


getStockData(){
  this.stock = this.firebase.list('customers');
  return this.stock.snapshotChanges();
}

postStockData(productData){
  console.log("ser Data" +productData.totalPrice)
  this.stock.push({
    stockUID:productData.product_UID,
    productGST:productData.product_GST,
    purchaseDate:productData.purchase_Date,
    productName:productData.product_Name,
    productId:productData.product_ID,
    productQunatity:productData.product_Quantity,
    productPrice:parseInt(productData.product_Price),
    totalPrice:productData.product_Total
    
  })
  
}

updateStock($key,cUID, CPDATA, productData){
  var avlQuan;
  
  this.stock.update($key, {
    stockUID:cUID,
    productGST:productData.product_GST,
    //purchaseDate:CPDATA,
    purchaseDate:productData.purchase_Date,
    productName:productData.product_Name,
    productId:productData.product_ID,
    productQunatity:productData.product_Quantity,
    productPrice:parseInt(productData.product_Price),
    totalPrice:productData.product_Total,
  })
}

stockRemove($key:any){
  // this.delid = productData;
   console.log("del sev " +$key.toString());
this.stock.remove($key);
 
 
}
}

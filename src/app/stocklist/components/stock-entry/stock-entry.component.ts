import { Component, OnInit, Input, EventEmitter, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog} from '@angular/material';
import { CommonService} from '../../../service/common.service';
import { StocAddComponent } from '../stoc-add/stoc-add.component';
import {CommunicationService } from '../../../service/communication.service';
import { Observable, from } from 'rxjs';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { StockUpdateComponent } from '../stock-update/stock-update.component';
import { angularMath } from 'angular-ts-math';
import { DownloadExcelService} from '../../../excelDownloadService/download-excel.service'
@Component({
  selector: 'stock-entry',
  templateUrl: './stock-entry.component.html',
  styleUrls: ['./stock-entry.component.scss']
})
export class StockEntryComponent implements OnInit {
  private subject = new Subject<any>();
  subscription: Subscription;
  message:any;
  tot=[];
  /*sendKey(message:any){
      this.subject.next(message);
  }*/

  stockData = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource :MatTableDataSource<any>;
  displayedColumns: string[] = ['Index', 'UID', 'Date', 'productID', 'stockName', 'stockQuan', 'stockPrice','stockGST', 'stockTotal', 'actions'];
  pageLength:any;

constructor(private service:CommonService, public dialog: MatDialog, private commService:CommunicationService, private excelService:DownloadExcelService) { 
    
  }

  ngOnInit()
  {
    this.pageOnLoad();
    //this.calculation();
    setTimeout(()=>{  }, 4000)

    //this.stockData.reduce(add, 0);


    function add(a, b) {
      return a + b;
  }
  //console.log("sum" +this.stockData.reduce(add, 0))
  
  }


  pageOnLoad()
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

          this.dataSource = new MatTableDataSource(this.stockData);
          this.dataSource.paginator = this.paginator;
          this.pageLength = this.stockData.length;
          
        console.log("da" + this.dataSource.data )
        
     // console.log("tt" +m.stockPrice);
      }
    )
  }
 
  openDialog(): void {
    const dialogRef = this.dialog.open(StocAddComponent, {
      width: '80%',
     // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }
  update($key:any, uid, pid, pdate, pname, pquan, pprice, pgst, ptot){
    
    console.log("del Quna" + $key, +uid);
    
   //this.billServ.delItem($key, quan, stockKey);
   this.commService.sendMessage($key, uid, pid, pdate, pname, pquan, pprice, pgst, ptot);
   this.updateDialog();
   setTimeout(()=>{  }, 4000)
  
   
    }

    updateDialog(): void {
      const dialogRef = this.dialog.open(StockUpdateComponent, {
        width: '80%',
       // data: {name: this.name, animal: this.animal}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        //this.animal = result;
      });
      
    }
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    del($Key){
        this.service.stockRemove($Key);
    }



    getTotalCost() {
  
      return this.stockData.map(t => t.productPrice).reduce((acc, value) => acc + value, 0);
    }

    downloadExcelFile(){
      this.excelService.exportAsExcelFile(this.stockData, 'sample');
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
   
}
export interface tableHeader{
  productId:any;
  productName:any;
}

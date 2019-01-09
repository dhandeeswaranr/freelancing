import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog} from '@angular/material';
import { CommonService} from '../../../service/common.service';
@Component({
  selector: 'app-billing-details-view',
  templateUrl: './billing-details-view.component.html',
  styleUrls: ['./billing-details-view.component.scss']
})
export class BillingDetailsViewComponent implements OnInit {

  stockData = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource :MatTableDataSource<any>;
  displayedColumns: string[] = ['Index', 'UID', 'Date', 'productID', 'stockName', 'stockQuan', 'stockPrice','stockGST', 'stockTotal', 'actions'];
  constructor(private service:CommonService) { }
  pageLength:any;
  ngOnInit() {
    this.pageOnLoad();
  }

  pageOnLoad()
  {
    this.service.getBillData().subscribe(
      stockData => 
      {
        this.stockData = stockData.map(
          
          stockList =>
          {
            console.log("working \n" + JSON.stringify(stockData) );
            
            return {
              $Key:stockList.key,
              ...stockList.payload.val()
            }
          });

          this.dataSource = new MatTableDataSource(this.stockData);
          this.dataSource.paginator = this.paginator;
          this.pageLength = this.stockData.length;
          
        console.log("data \n" + JSON.stringify(this.dataSource.data)  )
        
     // console.log("tt" +m.stockPrice);
      }
    )
  }

  del($Key){
    console.log("Delete " + $Key)
    this.service.billRemove($Key);
}

}

import { Component, OnInit } from '@angular/core';
import { CommonService} from '../../../service/common.service'
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-stock-container',
  templateUrl: './stock-container.component.html',
  styleUrls: ['./stock-container.component.scss']
})
export class StockContainerComponent implements OnInit {
  stockData =[]
  constructor(private service:CommonService) { }

  ngOnInit() {
    //console.log("onInit" + stockData);
    this.pageOnLoad();

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
      }
    )
  }

}

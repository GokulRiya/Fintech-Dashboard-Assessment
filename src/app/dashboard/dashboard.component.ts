import { Component, OnInit } from '@angular/core';
import { TransfersService } from '../transfer.service';
import { TransactionsService } from '../transactions.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  totalBalance = 50000;
  totalTransactions = 128;
  pendingTransfers = 4;

  chartData = [12000, 15000, 9000, 18000, 22000, 14000];
  chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  constructor(private service: TransfersService, private txService: TransactionsService,) { }

  ngOnInit(): void {

    this.service.getAll().subscribe(res => {
      this.pendingTransfers = res.length;
    });

    this.txService.getAll().subscribe(res => {
      this.totalTransactions = res.length;
    });
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionsService } from '../transactions.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTransactionDialogComponent } from './add-transaction-dialog/add-transaction-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  isLoading = false;
  displayedColumns: string[] = ['date', 'type', 'amount', 'description', 'status'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private txService: TransactionsService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.txService.getAll().subscribe(res => {
      this.dataSource.data = res;
      this.isLoading = false;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addTransaction() {
    const dialogRef = this.dialog.open(AddTransactionDialogComponent, {
      width: '400px',
      height: '500px',
      panelClass: 'rounded-2xl',
      disableClose: true,
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadData();  // refresh your mat-table
    });

  }

}

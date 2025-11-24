import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TransfersService } from '../transfer.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddTransferDialogComponent } from './add-transfer-dialog/add-transfer-dialog.component';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfer.component.html'
})
export class TransfersComponent implements OnInit {

  isLoading = false;
  displayedColumns: string[] = ['fromaccount', 'toaccount', 'amount', 'remarks', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  form = this.fb.group({
    fromAccount: [''],
    toAccount: [''],
    amount: [''],
    remarks: [''],
    status: ['Pending']
  });

  constructor(private fb: FormBuilder, private dialog: MatDialog,
    private service: TransfersService) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.isLoading = true;
    this.service.getAll().subscribe(res => {
      console.log(res)
      this.dataSource.data = res;   // updates table automatically
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

  createTransfer() {
    this.service.create(this.form.value).subscribe(() => {
      this.load();
      this.form.reset();
    });
  }

  changeStatus(id: number, status: string) {
    this.service.updateStatus(id, status).subscribe(() => this.load());
  }

  addTransfers() {
    console.log(this.form.value)
    const dialogRef = this.dialog.open(AddTransferDialogComponent, {
      width: '400px',
      height: '500px',
      panelClass: 'rounded-2xl',
      disableClose: true,
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.load();  // refresh your mat-table
    });

  }
}

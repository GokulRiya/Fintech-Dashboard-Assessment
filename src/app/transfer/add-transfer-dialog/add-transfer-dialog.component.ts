import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { TransactionsService } from 'src/app/transactions.service';
import { MatIconModule } from '@angular/material/icon';
import { TransfersComponent } from '../transfer.component';
import { TransfersService } from 'src/app/transfer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-add-transfer-dialog',
    standalone: true,
    templateUrl: './add-transfer-dialog.component.html',
    imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class AddTransferDialogComponent {

    form = this.fb.group({
        fromAccount: ['', Validators.required],
        toAccount: ['', Validators.required],
        amount: ['', Validators.required],
        remarks: ['', Validators.required],
        status: ['Pending']
    });

    constructor(
        private fb: FormBuilder, private toastr: ToastrService,
        private api: TransfersService,
        private dialogRef: MatDialogRef<TransfersComponent>
    ) { }

    createTransfer() {
        if (this.form.valid) {
            this.api.create(this.form.value).subscribe({
                next: () => {
                    this.toastr.success('Transfer added successfully!');
                    this.dialogRef.close(true);
                },
                error: () => {
                    this.toastr.error('Failed to add transfer');
                }
            });
        }
    }

    close() {
        this.dialogRef.close();
    }
}

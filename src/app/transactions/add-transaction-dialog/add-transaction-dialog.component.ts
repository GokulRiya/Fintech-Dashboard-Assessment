import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { TransactionsService } from 'src/app/transactions.service';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-add-transaction-dialog',
    standalone: true,
    templateUrl: './add-transaction-dialog.component.html',
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
export class AddTransactionDialogComponent {

    form = this.fb.group({
        date: ['',Validators.required],
        type: ['Credit'],
        amount: ['',Validators.required],
        description: ['',Validators.required],
        status: ['Pending']
    });

    constructor(
        private fb: FormBuilder, private toastr: ToastrService,
        private api: TransactionsService,
        private dialogRef: MatDialogRef<AddTransactionDialogComponent>
    ) { }

    submit() {
        if (this.form.valid) {
            this.api.add(this.form.value).subscribe({
                next: () => {
                    this.toastr.success('Transaction added successfully!');
                    this.dialogRef.close(true);
                },
                error: () => {
                    this.toastr.error('Failed to add transaction');
                }
            });
        }
    }

    close() {
        this.dialogRef.close();
    }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required]
    });

    if (this.data) {
      this.isEdit = true;
      this.productForm.patchValue(this.data);
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      const operation = this.isEdit 
        ? this.productService.updateProduct(this.data._id, product)
        : this.productService.createProduct(product);

      operation.subscribe(
        () => {
          this.snackBar.open(`Product ${this.isEdit ? 'updated' : 'created'} successfully`, 'Close', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error => this.snackBar.open(`Error ${this.isEdit ? 'updating' : 'creating'} product`, 'Close', { duration: 3000 })
      );
    }
  }
}
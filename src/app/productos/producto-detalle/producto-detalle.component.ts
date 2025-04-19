import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ProductosService } from '../productos.service';
import { Product } from '../productos/product.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-producto-detalle',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
    // otros módulos como CommonModule, FormsModule si los estás usando
  ],
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./productos-detalle.component.scss'],
})
export class ProductoDetalleComponent implements OnInit {
  productForm!: FormGroup;
  productId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.productosService.getProductById(this.productId).subscribe((product) => {
      this.buildForm(product);
    });
  }

  buildForm(product: Product) {
    this.productForm = this.fb.group({
      id: [product.id],
      name: [product.name],
      slug: [product.slug],
      permalink: [product.permalink],
      date_created: [product.date_created],
      date_modified: [product.date_modified],
      type: [product.type],
      status: [product.status],
      featured: [product.featured],
      catalog_visibility: [product.catalog_visibility],
      description: [product.description],
      short_description: [product.short_description],
      sku: [product.sku],
      price: [product.price],
      regular_price: [product.regular_price],
      sale_price: [product.sale_price],
      on_sale: [product.on_sale],
      purchasable: [product.purchasable],
      total_sales: [product.total_sales],
      virtual: [product.virtual],
      downloadable: [product.downloadable],
      dimensions: this.fb.group({
        length: [product.dimensions.length],
        width: [product.dimensions.width],
        height: [product.dimensions.height]
      }),
      shipping_required: [product.shipping_required],
      shipping_taxable: [product.shipping_taxable],
      reviews_allowed: [product.reviews_allowed],
      average_rating: [product.average_rating],
      rating_count: [product.rating_count],
      stock_status: [product.stock_status],
      categories: this.fb.array(product.categories.map(c => this.fb.group({
        id: [c.id],
        name: [c.name],
        slug: [c.slug]
      }))),
      images: this.fb.array(product.images.map(i => this.fb.group({
        id: [i.id],
        src: [i.src],
        name: [i.name],
        alt: [i.alt]
      }))),
      meta_data: this.fb.array(product.meta_data.map(m => this.fb.group({
        id: [m.id],
        key: [m.key],
        value: [m.value]
      })))
    });
  }

  get categories(): FormArray {
    return this.productForm.get('categories') as FormArray;
  }

  get images(): FormArray {
    return this.productForm.get('images') as FormArray;
  }

  get meta_data(): FormArray {
    return this.productForm.get('meta_data') as FormArray;
  }

  guardarCambios() {
    const updatedProduct = this.productForm.value;
    this.productosService.updateProduct(this.productId, updatedProduct).subscribe(() => {
      this.router.navigate(['/productos']);
    });
  }
  
}

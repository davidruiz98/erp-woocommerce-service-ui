import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProductosService } from '../productos.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './producto-detalle.component.html',
})
export class ProductoDetalleComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productosService = inject(ProductosService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    nombre: [''],
    descripcion: [''],
    precio: [0],
  });

  productoId!: number;

  ngOnInit(): void {
/*     this.productoId = Number(this.route.snapshot.paramMap.get('id'));
    this.productosService.getProducto(this.productoId).subscribe(producto => {
      this.form.patchValue(producto);
    }); */
  }

   actualizar() {
    alert('Producto actualizado');
/*     this.productosService.actualizarProducto(this.productoId, this.form.value).subscribe(() => {
      alert('Producto actualizado');
      this.router.navigate(['/productos']);
    }); */
  } 
}

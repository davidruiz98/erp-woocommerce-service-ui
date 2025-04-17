import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ProductosService } from '../productos.service';
import { Product } from '../../productos/productos/product.interface';

@Component({
  selector: 'app-productos-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './productos-list.component.html'
})
export class ProductosListComponent {
  displayedColumns: string[] = ['id', 'nombre', 'precio','pn', 'acciones'];
  dataSource: Product[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    this.productosService.getProductos().subscribe((data: Product[]) => {
      this.dataSource = data;
    });
  }
  consultarPrecios(id: number) {
    this.productosService.getPreciosPorProducto(id).subscribe((data) => {
      console.log('Precios del producto:', data);
      alert(`Proveedor 1: ${data.proveedor1} - Proveedor 2: ${data.proveedor2}`);
    });
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ProductoPreciosComponent } from '../producto-precios/producto-precios.component';
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
    RouterModule,
    ProductoPreciosComponent
  ],
  templateUrl: './productos-list.component.html'
})
export class ProductosListComponent {
  displayedColumns: string[] = ['id', 'nombre', 'precio','pn', 'acciones'];
  dataSource: Product[] = [];
  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe((data: Product[]) => {
      this.dataSource = data;
    });
  }
  consultarPrecios(sku: string) {
    this.productosService.getPreciosByParte(sku).subscribe((data) => {
      console.log('Precios del producto:', data);
      alert(`Proveedor 1: ${data}`);
    });
  } 

  /* consultarPrecios(sku: string) {
    this.productos = this.productos.map(producto => {
      if (producto.sku === sku) {
        return { ...producto, mostrarPrecios: !producto.mostrarPrecios };
      }
      return producto;
    });
  } */


}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ProductosService } from '../productos.service';
import { Product } from '../../productos/productos/product.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-productos-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    MatCardModule,
    RouterModule
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

}

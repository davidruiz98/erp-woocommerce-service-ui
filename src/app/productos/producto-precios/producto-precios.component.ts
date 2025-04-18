import { Component, Input, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service';
import { PrecioProveedor  } from '../productos/PrecioProveedor';
import { CommonModule } from '@angular/common'; 
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-producto-precios',
  imports: [CommonModule, MatButtonModule], 
  templateUrl: './producto-precios.component.html'
})
export class ProductoPreciosComponent implements OnInit {
  @Input() parte!: string;
  precio: PrecioProveedor | null = null; 
  cargando = false;
  error: string | null = null;
  sku!: string;
  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    this.sku = this.route.snapshot.paramMap.get('sku')!;
    this.cargarPrecios();
  }

  cargarPrecios(): void {
    this.cargando = true;
    this.productosService.getPreciosByParte(this.sku).subscribe({
      next: (data) => {
        this.precio = data;  
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.error = 'Error al cargar los datos';
        this.cargando = false;
      }
    });
  }

  cargarPrecios2(): void {
    this.cargando = true;
    this.productosService.getPreciosByParte2(this.sku).subscribe({
      next: (data) => {
        this.precio = data;  
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.error = 'Error al cargar los datos';
        this.cargando = false;
      }
    });
  }

 

}

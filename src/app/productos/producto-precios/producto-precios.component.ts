import { Component, Input, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service';
import { PrecioProveedor  } from '../productos/PrecioProveedor';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-producto-precios',
  imports: [CommonModule], 
  templateUrl: './producto-precios.component.html'
})
export class ProductoPreciosComponent implements OnInit {
  @Input() parte!: string;
  precios: PrecioProveedor[] = [];
  cargando = false;
  error: string | null = null;

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    if (this.parte) {
      this.cargarPrecios();
    }
  }

  cargarPrecios(): void {
    this.cargando = true;
    this.productosService.getPreciosByParte(this.parte).subscribe({
      next: (data) => {
        this.precios = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al consultar precios:', err);
        this.error = 'No se pudieron cargar los precios.';
        this.cargando = false;
      }
    });
  }
}

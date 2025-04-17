import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../productos.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-producto-precios',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './producto-precios.component.html',
})
export class ProductoPreciosComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productosService = inject(ProductosService);

  productoId!: number;
  precios: { proveedor: string; precio: number }[] = [];

  ngOnInit(): void {
    this.productoId = Number(this.route.snapshot.paramMap.get('id'));
/*     this.productosService.consultarPrecios(this.productoId).subscribe(res => {
      this.precios = res;
    }); */
  }
}

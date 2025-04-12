import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrdenesService } from '../ordenes.service';
import { ClientesService } from 'src/app/clientes/clientes.service';
import { ProductosService } from 'src/app/productos/productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-orden',
  templateUrl: './crear.component.html',
})
export class CrearComponent implements OnInit {
  form: FormGroup;
  clientes: any[] = [];
  productos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private ordenesService: OrdenesService,
    private clientesService: ClientesService,
    private productosService: ProductosService,
    private router: Router
  ) {
    this.form = this.fb.group({
      cliente: ['', Validators.required],
      productos: ['', Validators.required],
      fecha: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.clientesService.obtenerTodos().subscribe(data => {
      this.clientes = data;
    });
    this.productosService.obtenerTodos().subscribe(data => {
      this.productos = data;
    });
  }

  guardar(): void {
    if (this.form.valid) {
      this.ordenesService.crear(this.form.value).subscribe(() => {
        this.router.navigate(['/ordenes']);
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdenesService } from '../ordenes.service';
import { ClientesService } from 'src/app/clientes/clientes.service';
import { ProductosService } from 'src/app/productos/productos.service';

@Component({
  selector: 'app-editar-orden',
  templateUrl: './editar.component.html',
})
export class EditarComponent implements OnInit {
  form: FormGroup;
  id!: number;
  clientes: any[] = [];
  productos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ordenesService: OrdenesService,
    private clientesService: ClientesService,
    private productosService: ProductosService
  ) {
    this.form = this.fb.group({
      cliente: ['', Validators.required],
      productos: ['', Validators.required],
      fecha: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.clientesService.obtenerTodos().subscribe(data => {
      this.clientes = data;
    });
    this.productosService.obtenerTodos().subscribe(data => {
      this.productos = data;
    });
    this.ordenesService.obtenerPorId(this.id).subscribe(data => {
      this.form.patchValue(data);
    });
  }

  guardar(): void {
    if (this.form.valid) {
      this.ordenesService.actualizar(this.id, this.form.value).subscribe(() => {
        this.router.navigate(['/ordenes']);
      });
    }
  }
}

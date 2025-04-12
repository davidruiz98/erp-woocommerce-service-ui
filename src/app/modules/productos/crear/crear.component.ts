import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear.component.html',
})
export class CrearComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
    });
  }

  guardar(): void {
    if (this.form.valid) {
      this.productosService.crear(this.form.value).subscribe(() => {
        this.router.navigate(['/productos']);
      });
    }
  }
}

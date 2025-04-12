import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar.component.html',
})
export class EditarComponent implements OnInit {
  form: FormGroup;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productosService: ProductosService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.productosService.obtenerPorId(this.id).subscribe(data => {
      this.form.patchValue(data);
    });
  }

  guardar(): void {
    if (this.form.valid) {
      this.productosService.actualizar(this.id, this.form.value).subscribe(() => {
        this.router.navigate(['/productos']);
      });
    }
  }
}

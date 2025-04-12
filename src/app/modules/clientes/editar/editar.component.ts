import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../clientes.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  imports: [FormsModule,ReactiveFormsModule,MatFormFieldModule],
})
export class EditarComponent implements OnInit {
  form: FormGroup;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private clientesService: ClientesService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.clientesService.obtenerPorId(this.id).subscribe(cliente => {
      this.form.patchValue(cliente);
    });
  }

  guardar(): void {
    if (this.form.valid) {
      this.clientesService.actualizar(this.id, this.form.value).subscribe(() => {
        this.router.navigate(['/clientes']);
      });
    }
  }
}


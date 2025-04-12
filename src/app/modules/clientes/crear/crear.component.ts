import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../clientes.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-crear',  
  templateUrl: './crear.component.html',
  imports: [FormsModule,ReactiveFormsModule,MatFormFieldModule],
})
export class CrearComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientesService: ClientesService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  guardar(): void {
    if (this.form.valid) {
      this.clientesService.crear(this.form.value).subscribe(() => {
        this.router.navigate(['/clientes']);
      });
    }
  }
}

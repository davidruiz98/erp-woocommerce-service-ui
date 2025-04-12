import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear.component.html',
})
export class CrearComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      rol: ['vendedor', Validators.required],
    });
  }

  guardar(): void {
    if (this.form.valid) {
      this.usuariosService.crear(this.form.value).subscribe(() => {
        this.router.navigate(['/usuarios']);
      });
    }
  }
}

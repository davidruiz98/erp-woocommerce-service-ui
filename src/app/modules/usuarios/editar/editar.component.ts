import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar.component.html',
})
export class EditarComponent implements OnInit {
  form: FormGroup;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usuariosService: UsuariosService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.usuariosService.obtenerPorId(this.id).subscribe(data => {
      this.form.patchValue(data);
    });
  }

  guardar(): void {
    if (this.form.valid) {
      this.usuariosService.actualizar(this.id, this.form.value).subscribe(() => {
        this.router.navigate(['/usuarios']);
      });
    }
  }
}

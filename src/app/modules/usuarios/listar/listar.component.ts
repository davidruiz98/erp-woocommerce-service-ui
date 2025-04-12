import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar.component.html',
})
export class ListarComponent implements OnInit {
  columnas: string[] = ['id', 'nombre', 'correo', 'rol', 'acciones'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.usuariosService.obtenerTodos().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Deseas eliminar este usuario?')) {
      this.usuariosService.eliminar(id).subscribe(() => this.ngOnInit());
    }
  }
}

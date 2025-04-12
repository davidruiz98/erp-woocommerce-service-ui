// usuarios.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private api = 'https://tubackend.com/api/usuarios';

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  obtenerPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  crear(usuario: any): Observable<any> {
    return this.http.post(this.api, usuario);
  }

  actualizar(id: number, usuario: any): Observable<any> {
    return this.http.put(`${this.api}/${id}`, usuario);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}

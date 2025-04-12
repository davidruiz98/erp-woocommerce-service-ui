// clientes.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientesService {
  private api = 'https://tubackend.com/api/clientes';

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  obtenerPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  crear(cliente: any): Observable<any> {
    return this.http.post(this.api, cliente);
  }

  actualizar(id: number, cliente: any): Observable<any> {
    return this.http.put(`${this.api}/${id}`, cliente);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}

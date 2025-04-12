// productos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private api = 'http://localhost:8030/api/wcProducts';

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  obtenerPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  crear(producto: any): Observable<any> {
    return this.http.post(this.api, producto);
  }

  actualizar(id: number, producto: any): Observable<any> {
    return this.http.put(`${this.api}/${id}`, producto);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}

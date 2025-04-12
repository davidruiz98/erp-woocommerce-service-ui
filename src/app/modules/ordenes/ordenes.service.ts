// ordenes.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrdenesService {
  private api = 'https://tubackend.com/api/ordenes';

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  obtenerPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  crear(orden: any): Observable<any> {
    return this.http.post(this.api, orden);
  }

  actualizar(id: number, orden: any): Observable<any> {
    return this.http.put(`${this.api}/${id}`, orden);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from './productos/producto.model';
import { Product } from './productos/product.interface';  

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'http://localhost:8030/api/wcProducts'; // actualiza esta URL

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProducto(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  crearProducto(producto: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, producto);
  }

  actualizarProducto(producto: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${producto.id}`, producto);
  }

  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPreciosPorProducto(id: number): Observable<{ proveedor1: number; proveedor2: number }> {
    return this.http.get<{ proveedor1: number; proveedor2: number }>(
      `${this.apiUrl}/${id}/precios`
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './productos/product.interface';  
import { PrecioProveedor } from './productos/PrecioProveedor';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'http://localhost:8030/api/wcProducts'; // actualiza esta URL
  private apiUrlSearch = 'http://localhost:8030/api/search';
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
  getPreciosByParte(parte: string): Observable<PrecioProveedor[]> {
    const body = { parte };
    return this.http.post<PrecioProveedor[]>(`${this.apiUrlSearch}/buscarII`, body);
  }

  updateProducto(id: number, producto: Partial<Product>) {
    return this.http.put(`${this.apiUrl}/productos/${id}`, producto);
  }

  getProductoById(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  updateProduct(id: number, updatedProduct: Product) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, updatedProduct);
  }
}

import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private api: ApiService) { }

  getProducts(): Observable<any> {
    return this.api.get('products');
  }

  getProduct(id: string): Observable<any> {
    return this.api.get(`products/${id}`);
  }

  createProduct(product: any): Observable<any> {
    return this.api.post('products', product);
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.api.put('products', id, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.api.delete('products', id);
  }
}
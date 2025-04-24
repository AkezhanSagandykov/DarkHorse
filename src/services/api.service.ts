// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  // 📦 Товары
  getProducts() {
    return this.http.get<any[]>(`${this.apiUrl}/products/`);
  }

  createProduct(data: any) {
    return this.http.post(`${this.apiUrl}/products/create/`, data);
  }

  // 🛒 Заказы
  createOrder(data: any) {
    return this.http.post(`${this.apiUrl}/orders/create/`, data);
  }

  getUserOrders() {
    return this.http.get<any[]>(`${this.apiUrl}/orders/my/`);
  }
  deleteProduct(productId: number) {
    return this.http.delete(`${this.apiUrl}/products/delete/${productId}/`);
  }
}

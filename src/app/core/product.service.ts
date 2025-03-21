import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { url, headers } from './utils';

interface Merchant {
  id: string;
  name: string;
  email: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  merchant: Merchant;
  createdAt?: string;
  updatedAt?: string;
}

interface ProductResponse {
  status: string;
  data: Product;
}

interface AllProductsResponse {
  status: string;
  data: Product[];
}


interface CreateProductRequest {
  name: string;
  price: number;
  description: string;
}

interface CreateProductResponse {
  status: string;
  data: Product;
}

interface UpdateProductRequest {
  name: string;
  price: number;
  description: string;
}

interface UpdateProductResponse {
  status: string;
  data: Product;
}

interface DeleteProductResponse {
  status: string;
  message?: string;
}


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  createProduct(productData: CreateProductRequest): Observable<CreateProductResponse> {
    return this.http.post<CreateProductResponse>(`${url}/products`, productData, { headers });
  }

  getAllProducts(): Observable<AllProductsResponse> {
    return this.http.get<AllProductsResponse>(`${url}/products`, { headers });
  }

  getProductById(productId: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${url}/products/${productId}`, {
      headers,
    });
  }

  getProductsByMerchantId(merchantId: string): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map((response) =>
        response.data.filter((product) => product.merchant.id === merchantId)
      )
    );
  }

  updateProduct(
    productId: string,
    productData: UpdateProductRequest
  ): Observable<UpdateProductResponse> {
    return this.http.put<UpdateProductResponse>(
      `${url}/products/${productId}`,
      productData,
      { headers }
    );
  }

  deleteProduct(productId: string): Observable<DeleteProductResponse> {
    return this.http.delete<DeleteProductResponse>(
      `${url}/products/${productId}`,
      { headers }
    );
  }
}

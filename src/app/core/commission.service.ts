import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { url } from './utils';

export interface Product {
  id: string;
  name: string;
}

export interface Transaction {
  id: string;
  customerId: string;
  affiliateId: string;
  productId: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

export interface Commission {
  id: string;
  affiliateId: string;
  transactionId: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  transaction: Transaction;
}

export interface CommissionResponse {
  status: string;
  results: number;
  data: Commission[];
}

interface UpdateCommissionRequest {
  status: string;
}

interface UpdateCommissionResponse {
  status: string;
  data: Commission;
}


@Injectable({
  providedIn: 'root',
})
export class CommissionService {
  constructor(private http: HttpClient) {}

  getAllCommissions(): Observable<{
    status: string;
    results: number;
    data: Commission[];
  }> {
    return this.http.get<{
      status: string;
      results: number;
      data: Commission[];
    }>(`${url}/commissions`);
  }

  getMyCommissions(): Observable<CommissionResponse> {
    return this.http.get<CommissionResponse>(`${url}/commissions/me`);
  }

  updateCommission(
    commissionId: string,
    data: UpdateCommissionRequest
  ): Observable<UpdateCommissionResponse> {
    return this.http
      .patch<UpdateCommissionResponse>(
        `${url}/commissions/${commissionId}`,
        data
      )
      .pipe(
        tap((response) => {
          if (response.status === 'success') {
            console.log('Commission updated successfully:', response.data);
          }
        })
      );
  }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url, headers } from './utils';

interface Transaction {
  id: string;
  customerId: string;
  affiliateId: string;
  productId: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateTransactionResponse {
  status: string;
  data: Transaction;
}

interface TransactionListResponse {
  status: string;
  data: Transaction[];
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private http = inject(HttpClient);

  createTransaction(
    affiliateLinkId: string
  ): Observable<CreateTransactionResponse> {
    return this.http.post<CreateTransactionResponse>(
      `${url}/transactions`,
      { affiliateLinkId },
      { headers }
    );
  }

  getAllTransactions(): Observable<TransactionListResponse> {
    return this.http.get<TransactionListResponse>(`${url}/transactions`, {
      headers,
    });
  }

  getMyTransactions(): Observable<TransactionListResponse> {
    return this.http.get<TransactionListResponse>(`${url}/transactions/me`, {
      headers,
    });
  }
}

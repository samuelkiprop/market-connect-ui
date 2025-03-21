import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from './utils';

interface UserStats {
  total: {
    admin: number;
    merchant: number;
    affiliate: number;
    customer: number;
  };
  totalCount: number;
}

interface SalesStats {
  total: number;
}

interface CommissionStats {
  paid: {
    total: number;
    count: number;
  };
  pending: {
    total: number;
    count: number;
  };
  totalAmount: number;
  totalCount: number;
}

interface PlatformStatsResponse {
  status: string;
  data: {
    users: UserStats;
    sales: SalesStats;
    commissions: CommissionStats;
    products: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class PlatformStatsService {
  private http = inject(HttpClient);

  getStats(): Observable<PlatformStatsResponse> {
    return this.http.get<PlatformStatsResponse>(`${url}/admin/stats`);
  }
}
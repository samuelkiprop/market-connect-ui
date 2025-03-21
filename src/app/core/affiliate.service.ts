import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url, headers } from './utils';

interface AffiliateLink {
  id: string;
  clicks: number;
  productId: string;
  affiliateId: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateAffiliateRequest {
  productId: string;
}

interface CreateAffiliateResponse {
  status: string;
  data: AffiliateLink;
}

interface AffiliateLink {
  id: string;
  clicks: number;
  productId: string;
  affiliateId: string;
  createdAt: string;
  updatedAt: string;
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    merchantId: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface GetAllAffiliatesResponse {
  status: string;
  data: AffiliateLink[];
}

interface GetAffiliateLinkByIdResponse {
  status: string;
  data: AffiliateLink;
}

@Injectable({
  providedIn: 'root',
})
export class AffiliateService {
  private http = inject(HttpClient);

  createAffiliateLink(
    data: CreateAffiliateRequest
  ): Observable<CreateAffiliateResponse> {
    return this.http.post<CreateAffiliateResponse>(`${url}/affiliates`, data, {
      headers,
    });
  }

  getAllAffiliateLinks(): Observable<GetAllAffiliatesResponse> {
    return this.http.get<GetAllAffiliatesResponse>(`${url}/affiliates`, {
      headers,
    });
  }

  getMyAffiliateLinks(): Observable<GetAllAffiliatesResponse> {
    return this.http.get<GetAllAffiliatesResponse>(
      `${url}/affiliates/my-links`,
      { headers }
    );
  }

  getAffiliateLinkById(id: string): Observable<GetAffiliateLinkByIdResponse> {
    return this.http.get<GetAffiliateLinkByIdResponse>(
      `${url}/affiliates/${id}`,
      { headers }
    );
  }

  deleteAffiliateLink(id: string): Observable<{ status: string }> {
    return this.http.delete<{ status: string }>(`${url}/affiliates/${id}`, {
      headers,
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpService {
  private readonly http = inject(HttpClient);

  public get<T>(url: string, responseType?: 'json'): Observable<T>;
  public get(url: string, responseType: 'blob'): Observable<Blob>;
  public get(url: string, responseType: 'arraybuffer'): Observable<ArrayBuffer>;
  public get(url: string, responseType: 'text'): Observable<string>;
  public get<T>(url: string, responseType: 'json' | 'blob' | 'arraybuffer' | 'text' = 'json') {
    if (responseType === 'blob') {
      return this.http.get(`${environment.apiUrl}/${url}`, { responseType });
    }

    if (responseType === 'arraybuffer') {
      return this.http.get(`${environment.apiUrl}/${url}`, { responseType });
    }

    if (responseType === 'text') {
      return this.http.get(`${environment.apiUrl}/${url}`, { responseType });
    }

    return this.http.get<T>(`${environment.apiUrl}/${url}`, { responseType });
  }

  public post<T>(url: string, body: unknown, responseType = 'json' as const) {
    return this.http.post<T>(`${environment.apiUrl}/${url}`, body, { responseType });
  }

  public postBlob(url: string, body: unknown): Observable<Blob> {
    return this.http.post(`${environment.apiUrl}/${url}`, body, { responseType: 'blob' });
  }

  public put<T>(url: string, body: unknown, responseType = 'json' as const) {
    return this.http.put<T>(`${environment.apiUrl}/${url}`, body, { responseType });
  }

  public delete<T>(url: string, responseType = 'json' as const) {
    return this.http.delete<T>(`${environment.apiUrl}/${url}`, { responseType });
  }
}

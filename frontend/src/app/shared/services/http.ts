import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HttpService {
  private readonly http = inject(HttpClient);

  private jsonOptions() {
    return {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    } as const;
  }

  public get<T>(url: string) {
    return this.http.get<T>(`api/${url}`, this.jsonOptions());
  }

  public post<T>(url: string, body: any) {
    return this.http.post<T>(`api/${url}`, body, this.jsonOptions());
  }

  public put<T>(url: string, body: any) {
    return this.http.put<T>(`api/${url}`, body, this.jsonOptions());
  }

  public delete<T>(url: string) {
    return this.http.delete<T>(`api/${url}`, this.jsonOptions());
  }
}

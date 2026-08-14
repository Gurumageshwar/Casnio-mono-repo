import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Base Casino API service — shared across all casino apps.
 * Each app's environment provides the `apiBaseUrl`.
 */
@Injectable({ providedIn: 'root' })
export class CasinoApiService {
  constructor(private http: HttpClient) {}

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(path);
  }

  post<T>(path: string, body: unknown): Observable<T> {
    return this.http.post<T>(path, body);
  }
}

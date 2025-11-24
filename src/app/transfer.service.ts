import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TransfersService {
  private api = 'http://localhost:3000/transfers';

  constructor(private http: HttpClient) {}

  create(data: any): Observable<any> {
    return this.http.post<any>(this.api, data);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  updateStatus(id: number, status: string) {
    return this.http.patch(`${this.api}/${id}`, { status });
  }
}

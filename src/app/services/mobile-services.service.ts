import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MobileServices {

  constructor(private http: HttpClient) { }

  public SearchUnMappedPhones(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/phones/SearchUnMappedPhones?keyword=${keyword}`).pipe();
  }

  public getwebsites(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/phones/getwebsites`).pipe();
  }

  public getworkingbrands(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/phones/getworkingbrands`).pipe();
  }

  public getworkingphones(brandid: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/phones/getworkingphones?brandid=${brandid}`).pipe();
  }
  
  public getphone(phoneid: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/phones/getphone?phoneid=${phoneid}`).pipe();
  }
}

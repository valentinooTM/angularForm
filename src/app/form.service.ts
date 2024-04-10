import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  api = "https://example.com"
  constructor(private http: HttpClient) { }

  sendForm(body: any) {
    console.log(body)
    this.http.post(this.api, body).subscribe();
  }
}

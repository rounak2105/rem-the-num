import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly ROOT_URL;
  id;
  constructor(private http: HttpClient) {
    this.ROOT_URL = "https://the-notes-app-angular-node.herokuapp.com";
  }

  getHighScore() {
    this.id = '210500';
    return this.http.get(`${this.ROOT_URL}/${this.id}`);
  }

  addHighScore(payload) {
    return this.http.post(this.ROOT_URL, payload);
  }

}

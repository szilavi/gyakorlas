import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Meal } from '../model/meal';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiUrl: string = 'http://localhost:3000/meals';

  constructor(private http: HttpClient) {}

  saveNewMeal(meal: Meal): Observable<Meal> {
    return this.http.post<Meal>(this.apiUrl, meal);
  }

  getMeal(): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.apiUrl);
  }
}

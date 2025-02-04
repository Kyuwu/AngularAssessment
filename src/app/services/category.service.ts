import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Category from '../models/category';
import Film from '../models/film';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getFilmsByCategory(categoryId: number): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.apiUrl}/${categoryId}/films`);
  }
}

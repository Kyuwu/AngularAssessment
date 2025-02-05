import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Category from '../models/category';
import Film from '../models/film';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
// Fetches from `http://my-prod-url` in production, `http://my-dev-url` in development.
  private apiUrl = `${environment.API_URL}`; // Base API URL for categories

  constructor(private http: HttpClient) {}
  
  /**
   * Fetches the list of all categories from the API.
   * @returns An observable containing an array of categories.
   */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }
  
  /**
   * Fetches the list of films for a specific category from the API.
   * @param categoryId - The ID of the category to retrieve films for.
   * @returns An observable containing an array of films.
   */
  getFilmsByCategory(categoryId: number): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.apiUrl}/categories/${categoryId}/films`);
  }
  
}

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import Category from '../models/category';
import Film from '../models/film';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  const mockCategories: Category[] = [
    { category_id: 1, name: 'Action', description: 'description' },
    { category_id: 2, name: 'Drama', description: 'description' },
  ];

  const mockFilms: Film[] = [
    {
      film_id: 1,
      rating: 'PG-13',
      title: 'Film 1',
      language: 'Nederlands',
      description: 'Action-packed movie',
      duration: 120,
      release_year: 2022,
    },
    {
      film_id: 2,
      rating: 'R',
      title: 'Film 2',
      language: 'Nederlands',
      description: 'Dramatic movie',
      duration: 132,
      release_year: 2021,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService]
    });

    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCategories', () => {
    it('should fetch categories from the API', () => {
      service.getCategories().subscribe((categories) => {
        expect(categories.length).toBe(2);
        expect(categories).toEqual(mockCategories);
      });

      const req = httpMock.expectOne('http://localhost:8080/categories');
      expect(req.request.method).toBe('GET');
      req.flush(mockCategories);
    });
  });

  describe('getFilmsByCategory', () => {
    it('should fetch films for a specific category from the API', () => {
      const categoryId = 1;

      service.getFilmsByCategory(categoryId).subscribe((films) => {
        expect(films.length).toBe(2);
        expect(films).toEqual(mockFilms);
      });

      const req = httpMock.expectOne(`http://localhost:8080/categories/${categoryId}/films`);
      expect(req.request.method).toBe('GET');
      req.flush(mockFilms);
    });
  });
});

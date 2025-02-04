import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import Category from '../models/category';
import { MatSidenav } from '@angular/material/sidenav';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'app-category-list',
  standalone: false,
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  selectedCategory: Category | null = null; 
  searchControl = new FormControl('');

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.map(category => ({
          ...category,
          description: this.capitalizeEveryWord(category.description.toLocaleLowerCase())
        }));
        this.filteredCategories = this.categories;
      },
      error: (err) => console.error('Error fetching categories', err),
    });

    this.searchControl.valueChanges
      .pipe(startWith(''))
      .subscribe(value => this.filterCategories(value || ''));
  }

  openSidenav(category: any, sidenav: MatSidenav): void {
    this.selectedCategory = category;
    sidenav.open();
  }
  
  filterCategories(query: string): void {
    const lowerCaseQuery = query.toLowerCase();
    this.filteredCategories = this.categories.filter(category =>
      category.name.toLowerCase().includes(lowerCaseQuery) ||
      category.description.toLowerCase().includes(lowerCaseQuery)
    );
  }

  capitalizeEveryWord(val: string): string {
    return val
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}

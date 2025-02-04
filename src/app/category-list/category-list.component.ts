import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import Category from '../models/category';
import { MatSidenav } from '@angular/material/sidenav';
import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs';

@Component({
  selector: 'app-category-list',
  standalone: false,
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = []; // List of all available categories
  filteredCategories: Category[] = []; // Categories filtered by search input
  selectedCategory: Category | null = null; // Currently selected category
  searchControl = new FormControl(''); // Search input control
  
  constructor(private categoryService: CategoryService) {}
  
  ngOnInit(): void {
    // Fetch categories from the service and format descriptions
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.map(category => ({
          ...category,
          description: this.capitalizeEveryWord(category.description.toLocaleLowerCase()),
        }));
        this.filteredCategories = this.categories; // Initialize filtered categories
      },
      error: (err) => console.error('Error fetching categories', err),
    });
  
    // Listen for search input changes and filter categories accordingly
    this.searchControl.valueChanges
      .pipe(startWith(''))
      .subscribe(value => this.filterCategories(value || ''));
  }
  
  /**
   * Opens the side navigation with the selected category.
   * @param category - The category to display in the sidenav.
   * @param sidenav - The MatSidenav instance to open.
   */
  openSidenav(category: Category, sidenav: MatSidenav): void {
    this.selectedCategory = category;
    sidenav.open();
  }
  
  /**
   * Filters the category list based on the search query.
   * @param query - The search input string.
   */
  filterCategories(query: string): void {
    const lowerCaseQuery = query.toLowerCase();
    this.filteredCategories = this.categories.filter(category =>
      category.name.toLowerCase().includes(lowerCaseQuery) ||
      category.description.toLowerCase().includes(lowerCaseQuery)
    );
  }
  
  /**
   * Capitalizes the first letter of every word in a string.
   * @param val - The string to format.
   * @returns The formatted string with each word capitalized.
   */
  capitalizeEveryWord(val: string): string {
    return val
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}

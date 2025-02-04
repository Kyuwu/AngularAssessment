import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import Category from '../models/category';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-category-list',
  standalone: false,
  
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: Category | null = null; 

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.map(category => ({
          ...category,
          description: this.capitalizeEveryWord(category.description.toLocaleLowerCase()) // Capitalize description
        }));
      },
      error: (err) => console.error('Error fetching categories', err),
    });
  }

  openSidenav(category: any, sidenav: MatSidenav): void {
    this.selectedCategory = category;
    console.log(this.selectedCategory)
    sidenav.open();
  }
  
  capitalizeEveryWord(val: string): string {
    return val
      .split(' ')  // Split the string into words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // Capitalize each word
      .join(' ');  // Join the words back into a string
  }
}

import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CategoryService } from '../services/category.service';
import Category from '../models/category';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { startWith, Subject, takeUntil } from 'rxjs';
import { FilmsListComponent } from '../films-list/films-list.component';
import { CategoryListCardComponent } from './category-list-card/category-list-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    MatSidenavModule,
    ReactiveFormsModule,
    FilmsListComponent,
    CategoryListCardComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    MatButtonModule
],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {
  categories = signal<Category[]>([]);
  filteredCategories = signal<Category[]>([]);
  selectedCategory: Category | null = null;
  searchControl = new FormControl('');
  private destroy$ = new Subject<void>();

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        const formattedCategories = data.map(category => ({
          ...category,
          description: this.capitalizeEveryWord(category.description.toLowerCase()),
        }));
        this.categories.set(formattedCategories);
        this.filteredCategories.set(formattedCategories);
      },
      error: (err) => console.error('Error fetching categories', err),
    });

    this.searchControl.valueChanges
      .pipe(startWith(''), takeUntil(this.destroy$))
      .subscribe(value => this.filterCategories(value || ''));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  showCategoryDetails(category: Category): void {
    this.selectedCategory = category;
  }

  closeCategoryDetails(): void {
    this.selectedCategory = null;
  }

  filterCategories(query: string): void {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = this.categories().filter(category =>
      category.name.toLowerCase().startsWith(lowerCaseQuery)
    );
    this.filteredCategories.set(filtered);
  }

  capitalizeEveryWord(val: string): string {
    return val
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
import { Component, computed, signal, inject } from '@angular/core';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CategoryService } from '../services/category.service';
import Category from '../models/category';
import Film from '../models/film';
import { input } from '@angular/core';
import { FilmsListCardComponent } from './films-list-card/films-list-card.component';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-films-list',
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    FilmsListCardComponent,
    MatInputModule
],
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent {
  readonly category = input.required<Category>(); // Selected category of films
  loading = signal(true); // Add a loading signal
  films = signal<Film[]>([]); // All films in the selected category
  selectedRatings = signal<string[]>([]); // Selected ratings for filtering

  private categoryService = inject(CategoryService);

  ngOnInit() {
    this.loadFilms(); // Load films initially
  }

  ngOnChanges(): void {
    this.loadFilms(); // Reload films when category changes
  }

  ratings = computed(() => {
    return Array.from(new Set(this.films().map(film => film.rating))); // Extract unique ratings
  });

  filteredFilms = computed(() => {
    const selected = this.selectedRatings();
    return selected.length > 0
      ? this.films().filter(film => selected.includes(film.rating))
      : this.films();
  });

  totalDuration = computed(() => {
    const totalMinutes = this.filteredFilms().reduce((sum, film) => sum + film.duration, 0);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours} hours ${minutes} minutes`;
  });

  /**
   * Fetches films based on the selected category.
   */

  private loadFilms(): void {
    this.loading.set(true); // Set loading to true before fetching
    const category = this.category();
    if (category) {
      this.categoryService.getFilmsByCategory(category.category_id).subscribe({
        next: (data) => {
          this.films.set(data);
          this.loading.set(false); // Set loading to false after data is loaded
        },
        error: (err) => {
          console.error('Error fetching films', err);
          this.loading.set(false); // Important: set loading to false even on error
        },
      });
    } else {
        this.loading.set(false); // handle the case when category is null
    }
  }

  /**
   * Toggles the selection of a rating.
   */
  toggleRatingSelection(rating: string): void {
    const updatedSelection = this.selectedRatings().includes(rating)
      ? this.selectedRatings().filter(r => r !== rating)
      : [...this.selectedRatings(), rating];

    this.selectedRatings.set(updatedSelection);
  }

  /**
   * Logic for adding a film. Placeholder for a dialog popup.
   */
  addFilm() {
    console.log('Add film button clicked');
  }
}

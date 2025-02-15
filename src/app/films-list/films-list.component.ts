import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Category from '../models/category';
import { CategoryService } from '../services/category.service';
import Film from '../models/film';

@Component({
  selector: 'app-films-list',
  standalone: false,
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() category!: Category; // Selected category of films
  films: Film[] = []; // All films in the selected category
  filteredFilms: Film[] = []; // Films filtered by selected ratings
  ratings: string[] = []; // Dynamically set available rating options
  selectedRatings: string[] = []; // Currently selected ratings for filtering

  totalDuration: string = ''; // Total duration of filtered films in HH:MM format

  private destroy$ = new Subject<void>(); // Tracks component lifecycle for cleanup

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadFilms(); // Load films when the component initializes
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Reload films if the category changes
    if (changes['category']) {
      console.log('Category changed:', changes['category'].currentValue);
      this.loadFilms();
    }
  }

  ngOnDestroy(): void {
    // Ensure all subscriptions are cleaned up when the component is destroyed
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Fetches films based on the selected category and updates available ratings.
   * Uses takeUntil to automatically unsubscribe when the component is destroyed.
   */
  private loadFilms(): void {
    if (this.category) {
      this.categoryService.getFilmsByCategory(this.category.category_id)
        .pipe(takeUntil(this.destroy$)) // Unsubscribe when component is destroyed
        .subscribe({
          next: (data) => {
            this.films = data;
            this.extractRatings(); // Extract unique ratings from fetched films
            this.filterFilmsByRating(); // Apply filtering after fetching films
          },
          error: (err) => console.error('Error fetching films', err),
        });
    }
  }

  /**
   * Extracts unique ratings from the films and updates the ratings array.
   */
  private extractRatings(): void {
    const uniqueRatings = new Set(this.films.map(film => film.rating));
    this.ratings = Array.from(uniqueRatings); // Convert set to array
  }

  /**
   * Toggles the selection of a rating and updates the filtered film list.
   * @param rating - The rating to toggle.
   */
  toggleRatingSelection(rating: string): void {
    const index = this.selectedRatings.indexOf(rating);
    if (index > -1) {
      this.selectedRatings.splice(index, 1); // Remove if already selected
    } else {
      this.selectedRatings.push(rating); // Add if not selected
    }
    this.filterFilmsByRating();
  }

  /**
   * Filters the films based on selected ratings and updates total duration.
   */
  filterFilmsByRating(): void {
    if (this.selectedRatings.length > 0) {
      this.filteredFilms = this.films.filter(film => this.selectedRatings.includes(film.rating));
    } else {
      this.filteredFilms = [...this.films]; // Show all films if no rating is selected
    }
    this.calculateTotalDuration(); // Recalculate total duration
  }

  /**
   * Calculates the total duration of the filtered films and formats it as HH:MM.
   */
  private calculateTotalDuration(): void {
    const totalMinutes = this.filteredFilms.reduce((sum, film) => sum + film.duration, 0);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    this.totalDuration = `${hours} hours ${minutes} minutes`;
  }

  /**
   * Logic for adding a film. Would be nice with a dialog popup or something in that direction.
   */
  addFilm(){
    // Open dialog logic
  }
}

import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import Category from '../models/category';
import { CategoryService } from '../services/category.service';
import Film from '../models/film';

@Component({
  selector: 'app-films-list',
  standalone: false,
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent implements OnInit, OnChanges {
  @Input() category!: Category; // Selected category of films
  films: Film[] = []; // All films in the selected category
  filteredFilms: Film[] = []; // Films filtered by selected ratings
  ratings: string[] = ['G', 'PG-13', 'R', 'NC-17']; // Available rating options
  selectedRatings: string[] = []; // Currently selected ratings for filtering

  totalDuration: string = ''; // Total duration of filtered films in HH:MM format

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

  /**
   * Fetches films based on the selected category and applies initial filtering.
   */
  private loadFilms(): void {
    if (this.category) {
      this.categoryService.getFilmsByCategory(this.category.category_id).subscribe({
        next: (data) => {
          this.films = data;
          this.filterFilmsByRating(); // Apply filtering after fetching films
        },
        error: (err) => console.error('Error fetching films', err),
      });
    }
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
    this.calculateTotalDuration();
  }

  /**
   * Calculates the total duration of the filtered films and formats it as HH:MM.
   */
  private calculateTotalDuration(): void {
    const totalMinutes = this.filteredFilms.reduce((sum, film) => sum + film.duration, 0);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    this.totalDuration = `${hours}h ${minutes}m`;
  }
}

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
  @Input() category!: Category;
  films: Film[] = [];
  totalDuration: string = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadFilms();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category']) {
      console.log('Category changed:', changes['category'].currentValue);
      this.loadFilms();
    }
  }

  private loadFilms(): void {
    if (this.category) {
      this.categoryService.getFilmsByCategory(this.category.category_id).subscribe({
        next: (data) => {
          this.films = data.map(film => ({
            ...film,
          }));
          this.calculateTotalDuration(); // Call the method to calculate the total duration
        },
        error: (err) => console.error('Error fetching films', err),
      });
    }
  }

  // Method to calculate total duration of films
  private calculateTotalDuration(): void {
    const totalMinutes = this.films.reduce((sum, film) => sum + film.duration, 0); // Assuming `film.duration` is in minutes

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    this.totalDuration = `${hours} hour(s) ${minutes} minute(s)`;
  }
}

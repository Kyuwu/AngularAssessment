import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import Film from '../../models/film';

@Component({
  selector: 'app-films-list-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
  ],
  templateUrl: './films-list-card.component.html',
  styleUrls: ['./films-list-card.component.scss'] // Fixed typo
})
export class FilmsListCardComponent {
  readonly film = input.required<Film>();
  readonly index = input.required<number>();
}

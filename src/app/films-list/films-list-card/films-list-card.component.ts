import { Component, Input } from '@angular/core';
import Film from '../../models/film';

@Component({
  selector: 'app-films-list-card',
  standalone: false,
  
  templateUrl: './films-list-card.component.html',
  styleUrl: './films-list-card.component.scss'
})
export class FilmsListCardComponent {
  @Input() film!: Film;
  @Input() index!: number;
}

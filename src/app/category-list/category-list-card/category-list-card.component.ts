import { Component, input } from '@angular/core';
import Category from '../../models/category';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-category-list-card',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './category-list-card.component.html',
  styleUrl: './category-list-card.component.scss'
})
export class CategoryListCardComponent {
  readonly category = input.required<Category>();
}

import { Component, Input } from '@angular/core';
import Category from '../../models/category';

@Component({
  selector: 'app-category-list-card',
  standalone: false,
  
  templateUrl: './category-list-card.component.html',
  styleUrl: './category-list-card.component.scss'
})
export class CategoryListCardComponent {
  @Input() category!: Category;
}

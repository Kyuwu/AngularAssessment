import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CategoryListComponent } from './category-list/category-list.component';
import { provideHttpClient } from '@angular/common/http';
import { AngularMaterialModule } from './angular-mat.module';
import { FilmsListComponent } from './films-list/films-list.component';
import { FilmsListCardComponent } from './films-list/films-list-card/films-list-card.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    FilmsListComponent,
    FilmsListCardComponent
  ],
  imports: [
    AngularMaterialModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

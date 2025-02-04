import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsListCardComponent } from './films-list-card.component';

describe('FilmsListCardComponent', () => {
  let component: FilmsListCardComponent;
  let fixture: ComponentFixture<FilmsListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilmsListCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmsListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

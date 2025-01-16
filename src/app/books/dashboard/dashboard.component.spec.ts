import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import {BookRatingService} from '../shared/book-rating.service';
import {Book} from '../shared/book';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {

    // selber ein Mock von RatingService bereitstellen und den Test Umgebung providen
    const ratingServiceMock = {
      rateUp: (b: Book) => b,
      rateDown: (b: Book) => b
    }
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [{
        provide: BookRatingService, useValue: ratingServiceMock // provide den gemockten service
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

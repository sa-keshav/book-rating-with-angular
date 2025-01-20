import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardComponent} from './dashboard.component';
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

    // const storeMock = { // so würde man asynchronität durch synchrone funktionen Mocken
    //   getAll: () => of([])
    // };

    // eine fertig gerenderte komponente mit den wir agieren können
    fixture = TestBed.createComponent(DashboardComponent);

    // TS_Klasseninstanz
    component = fixture.componentInstance;

    // Zugriff auf DOM-Element
    // fixture.nativeElement.querySelector('p')

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service.rateUp() for doRateUp() ', () => {
    // Arrange
    // Service injection, das ist in Wahrheit aber unser ratingMock
    const ratingService = TestBed.inject(BookRatingService);
    let testBook = { isbn: 'isbn'} as Book; // Type Assertion

    // ein spy ersetzt die methode immer
    // spyOn(ratingService, 'rateUp').and.returnValue(testBook);
    // spyOn(ratingService, 'rateUp').and.callFake(b => b);
    // spyOn(ratingService, 'rateUp').and.callFake(() => testBook);
    // Methode überwachen, aber original Methode nicht wegwerfen,
    // sondern weiterhin
    spyOn(ratingService, 'rateUp').and.callThrough();

    // ACT
    component.doRateUp(testBook)

    // ASSERT
    expect(ratingService.rateUp).toHaveBeenCalledOnceWith(testBook)
  });
});

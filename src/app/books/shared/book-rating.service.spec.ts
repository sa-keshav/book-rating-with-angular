import {TestBed} from '@angular/core/testing';

import {BookRatingService} from './book-rating.service';
import {Book} from './book';

describe('BookRatingService', () => {
  let service: BookRatingService;
  let book: Book;

  beforeEach(() => {
    // Arrange
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookRatingService);

    book = {
      isbn : '',
      title: '',
      description: '',
      price: 3,
      rating: 3
    };
    // oder wenn wir uns nur für rating interessieren können auch das object so bauen und den Kompiler trixen.
    // book = { rating: 3} as Book;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should rate up a book by one', () => {
    // Arrange
    book.rating = 3;

    // Act
    const ratedBook = service.rateUp(book);

    // Assert
    expect(ratedBook.rating).toBe(4); // NICHT: book.rating + 1, am besten konkrete Werte nehmen.
  });

  it('should rate down a book by one', () => {
    // Arrange
    book.rating = 3;

    // Act
    const ratedBook = service.rateDown(book);

    // Assert
    expect(ratedBook.rating).toBe(2);

  });

  it('should not rate below 1', () => {
    // Arrange
    book.rating = 1;

    // Act
    const ratedBook = service.rateDown(book);

    // Assert
    expect(ratedBook.rating).toBe(1);
  });

  it('should not rate above 5', () => {
    // Arrange
    book.rating = 5;

    // Act
    const ratedBook = service.rateUp(book);
    const roundedRate = Math.round(ratedBook.rating)

    // Assert
    expect(ratedBook.rating).toBe(5);
    expect(roundedRate).toBe(5);



  });
});

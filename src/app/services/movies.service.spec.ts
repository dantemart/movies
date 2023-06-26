import { MoviesService } from './movies.service';

import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('MoviesService', () => {
  let service: MoviesService;
  let spy: jasmine.SpyObj<HttpClient>

  beforeEach(() => {
    spy = jasmine.createSpyObj('HttpClient', ['get'])
    service = new MoviesService(spy);
    spy.get.and.returnValue(of(fackedApiResponseForYearFilter));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http get if year filter is used', (done: DoneFn) => {
    service.searchYear = 2018;
    setTimeout(() => {
      service.movies$.subscribe({
        next: res => {
          expect(spy.get).toHaveBeenCalledTimes(1);
          done();
        },
        error: done.fail
      })
    }, 1200);
  });

  it('should call http get if winner filter is used', (done: DoneFn) => {
    service.searchWinner = true;
    setTimeout(() => {
      service.movies$.subscribe({
        next: res => {
          expect(spy.get).toHaveBeenCalledTimes(1);
          done();
        },
        error: done.fail
      })
    }, 1200);
  });

  it('should call http get twice if winner and year filter are used', (done: DoneFn) => {
    service.searchWinner = true;
    setTimeout(() => {
      service.searchYear = 2018;
    }, 1000);
    setTimeout(() => {
      service.movies$.subscribe({
        next: res => {
          expect(spy.get).toHaveBeenCalledTimes(2);
          done();
        },
        error: done.fail
      })
    }, 3000);
  });

  it('should call http get if winner filter has both options', (done: DoneFn) => {
    service.searchWinner = '';
    setTimeout(() => {
      service.movies$.subscribe({
        next: res => {
          expect(spy.get).toHaveBeenCalledTimes(1);
          done();
        },
        error: done.fail
      })
    }, 1200);
  });

});

const fackedApiResponseForYearFilter = {
  "content": [
      {
          "id": 197,
          "year": 2018,
          "title": "Holmes & Watson",
          "studios": [
              "Columbia Pictures"
          ],
          "producers": [
              "Adam McKay",
              "Clayton Townsend",
              "Jimmy Miller",
              "Will Ferrell"
          ],
          "winner": true
      },
      {
          "id": 198,
          "year": 2018,
          "title": "Gotti",
          "studios": [
              "Vertical Entertainment"
          ],
          "producers": [
              "George Furla",
              "Marc Fiore",
              "Michael Froch",
              "Randall Emmett"
          ],
          "winner": false
      },
      {
          "id": 199,
          "year": 2018,
          "title": "The Happytime Murders",
          "studios": [
              "STX"
          ],
          "producers": [
              "Ben Falcone",
              "Brian Henson",
              "Jeffrey Hayes",
              "Melissa McCarthy"
          ],
          "winner": false
      },
      {
          "id": 200,
          "year": 2018,
          "title": "Robin Hood",
          "studios": [
              "Summit Entertainment"
          ],
          "producers": [
              "Jennifer Davisson",
              "Leonardo DiCaprio"
          ],
          "winner": false
      },
      {
          "id": 201,
          "year": 2018,
          "title": "Winchester",
          "studios": [
              "Lionsgate"
          ],
          "producers": [
              "Brett Tomberlin",
              "Tim McGahan"
          ],
          "winner": false
      }
  ],
  "pageable": {
      "sort": {
          "unsorted": true,
          "sorted": false,
          "empty": true
      },
      "offset": 0,
      "pageSize": 15,
      "pageNumber": 0,
      "paged": true,
      "unpaged": false
  },
  "totalPages": 1,
  "totalElements": 5,
  "last": true,
  "size": 15,
  "number": 0,
  "sort": {
      "unsorted": true,
      "sorted": false,
      "empty": true
  },
  "first": true,
  "numberOfElements": 5,
  "empty": false
}
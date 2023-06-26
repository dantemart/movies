import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { WinnersComponent } from './winners.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { MoviesService } from 'src/app/services/movies.service';
import { of } from 'rxjs';

describe('WinnersComponent', () => {
  let component: WinnersComponent;
  let fixture: ComponentFixture<WinnersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WinnersComponent],
      imports: [HttpClientTestingModule, FormsModule]
    });
    fixture = TestBed.createComponent(WinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('year filter should be empty on component creation', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input').textContent).toEqual('');
  });

  it('component var should have same value as year filter input on typing', async () => {
    let input = fixture.debugElement.nativeElement.querySelector('input');
    input.value = 2018;
    input.dispatchEvent(new Event('input'));
    expect(2018).toEqual(Number(component.year));
  });

  it('movies list should have one item when search happens', async () => {
    const movieService = fixture.debugElement.injector.get(MoviesService);
    let spy = spyOn(movieService, "getWinnersByYear").and.returnValue(
      of(fakedApiResponse)
    );
    fixture.detectChanges();
    
    let input = fixture.debugElement.nativeElement.querySelector('input');
    input.value = 2018;
    input.dispatchEvent(new Event('input'));
    fixture.debugElement.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    
    expect(component.movies.length).toBeGreaterThan(0);
    expect(component.movies[0].title).toContain('Holmes & Watson');
  });

});

const fakedApiResponse = [
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
  }
]

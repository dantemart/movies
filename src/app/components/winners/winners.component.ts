import { Component } from '@angular/core';
import { take } from 'rxjs';
import { Movie } from 'src/app/interfaces/movies.interfaces';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss']
})
export class WinnersComponent {

  year: string = ''
  movies: Movie[] = []

  constructor(private movieService: MoviesService) {

  }

  ngOnInit() {
  }

  searchByYear() {
    this.movieService.getWinnersByYear(this.year).pipe(take(1)).subscribe(res => this.movies = res)
  }
}

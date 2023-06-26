import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movies.interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  movies$: Observable<Movie[]>;
	total$: Observable<number>;

  constructor(public movieService: MoviesService) {
    this.movies$ = movieService.movies$;
		this.total$ = movieService.total$;
  }

}

import { Component } from '@angular/core';
import { take } from 'rxjs';
import { Studios } from 'src/app/interfaces/studios.interfaces';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-studios',
  templateUrl: './studios.component.html',
  styleUrls: ['./studios.component.scss']
})
export class StudiosComponent {

  studios: Studios[] = []

  constructor(private movieService: MoviesService) { }

  ngOnInit() {
    this.movieService.getStudiosWithMostWins().pipe(take(1)).subscribe(res => this.studios = res)
  }
}

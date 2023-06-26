import { Component } from '@angular/core';
import { take } from 'rxjs';
import { MinMaxInterval } from 'src/app/interfaces/intervals.interfaces';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-interval',
  templateUrl: './interval.component.html',
  styleUrls: ['./interval.component.scss']
})
export class IntervalComponent {
  minMaxInterval: MinMaxInterval = { min: [], max: [] }

  constructor(private movieService: MoviesService) { }

  ngOnInit() {
    this.movieService.getMaxMinIntervalProducers().pipe(take(1)).subscribe(res => this.minMaxInterval = res)
  }
}

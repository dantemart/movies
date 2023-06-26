import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Years } from 'src/app/interfaces/years.interfaces';
import { take } from 'rxjs';

@Component({
  selector: 'app-years',
  templateUrl: './years.component.html',
  styleUrls: ['./years.component.scss']
})
export class YearsComponent {

  years: Years[] = []

  constructor(private movieService: MoviesService) {

  }

  ngOnInit() {
    this.movieService.getYearsWithMultipleWinners().pipe(take(1)).subscribe(res => this.years = res)
  }
}

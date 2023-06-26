import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { YearsComponent } from '../components/years/years.component';
import { StudiosComponent } from '../components/studios/studios.component';
import { IntervalComponent } from '../components/interval/interval.component';
import { WinnersComponent } from '../components/winners/winners.component';
import { FormsModule } from '@angular/forms';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, YearsComponent, StudiosComponent, IntervalComponent, WinnersComponent],
      imports: [HttpClientTestingModule, FormsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

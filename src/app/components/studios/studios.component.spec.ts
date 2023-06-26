import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudiosComponent } from './studios.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StudiosComponent', () => {
  let component: StudiosComponent;
  let fixture: ComponentFixture<StudiosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudiosComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(StudiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

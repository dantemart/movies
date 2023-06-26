import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearsComponent } from './years.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('YearsComponent', () => {
  let component: YearsComponent;
  let fixture: ComponentFixture<YearsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YearsComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(YearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

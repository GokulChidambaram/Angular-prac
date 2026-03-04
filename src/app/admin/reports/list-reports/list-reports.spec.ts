import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReports } from './list-reports';

describe('ListReports', () => {
  let component: ListReports;
  let fixture: ComponentFixture<ListReports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListReports]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListReports);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

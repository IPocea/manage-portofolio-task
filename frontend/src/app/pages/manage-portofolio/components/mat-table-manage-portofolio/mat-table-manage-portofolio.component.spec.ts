import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableManagePortofolioComponent } from './mat-table-manage-portofolio.component';

describe('MatTableManagePortofolioComponent', () => {
  let component: MatTableManagePortofolioComponent;
  let fixture: ComponentFixture<MatTableManagePortofolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatTableManagePortofolioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatTableManagePortofolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

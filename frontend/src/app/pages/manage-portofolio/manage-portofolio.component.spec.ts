import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePortofolioComponent } from './manage-portofolio.component';

describe('ManagePortofolioComponent', () => {
  let component: ManagePortofolioComponent;
  let fixture: ComponentFixture<ManagePortofolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePortofolioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePortofolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

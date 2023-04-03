import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPortofolioComponent } from './add-edit-portofolio.component';

describe('AddEditPortofolioComponent', () => {
  let component: AddEditPortofolioComponent;
  let fixture: ComponentFixture<AddEditPortofolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPortofolioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPortofolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

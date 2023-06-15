import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContributionsFormPage } from './contributions-form.page';

describe('ContributionsFormPage', () => {
  let component: ContributionsFormPage;
  let fixture: ComponentFixture<ContributionsFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ContributionsFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

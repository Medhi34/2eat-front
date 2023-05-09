import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContributionsPage } from './contributions.page';

describe('ContributionsPage', () => {
  let component: ContributionsPage;
  let fixture: ComponentFixture<ContributionsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ContributionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailsMealSkeletonComponent } from './details-meal-skeleton.component';

describe('DetailsMealSkeletonComponent', () => {
  let component: DetailsMealSkeletonComponent;
  let fixture: ComponentFixture<DetailsMealSkeletonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsMealSkeletonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsMealSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailsRestaurantSkeletonComponent } from './details-restaurant-skeleton.component';

describe('DetailsRestaurantSkeletonComponent', () => {
  let component: DetailsRestaurantSkeletonComponent;
  let fixture: ComponentFixture<DetailsRestaurantSkeletonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsRestaurantSkeletonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsRestaurantSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { MealImageComponent } from './meal-image/meal-image.component';
import { HttpService } from './service/http.service';
import { HttpClientModule } from '@angular/common/http';
import { MealListComponent } from './meal-list/meal-list.component';
import { MealFormComponent } from './meal-form/meal-form.component';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MealFormComponent,
        MealListComponent
      ],
      imports: [HttpClientModule]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-exercise'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-exercise');
  });


});

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { MealFormComponent } from './meal-form/meal-form.component';
import { MealImageComponent } from './meal-image/meal-image.component';
import { MealListComponent } from './meal-list/meal-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MealFormComponent,
    MealImageComponent,
    MealListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Meal } from '../model/meal';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.css'],
})
export class MealFormComponent implements OnInit {
  myForm: FormGroup = new FormGroup({
    foodName: new FormControl('', [
      Validators.pattern('^[^0-9].*'),
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern('^[1-9][0-9]*$'),
    ]),
    category: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [
      Validators.required,
      Validators.pattern('^(http://|https://).*'),
      Validators.maxLength(255),
    ]),
  });

  constructor(private mealService: HttpService) {}

  ngOnInit(): void {}

  saveNewMeal = (myForm: FormGroup): FormGroup => {
    return myForm.value;
  };

  sendMealToServer = (meal: Meal) => {
    this.mealService.saveNewMeal(meal).subscribe((meal) => {
      console.log(meal);
    });
  };
}

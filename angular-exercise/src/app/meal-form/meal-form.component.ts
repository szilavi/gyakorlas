import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
      Validators.pattern('^[0-9]*$'),
      Validators.min(0),
    ]),
    category: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [
      Validators.pattern('^(http://|https://).*'),
      Validators.maxLength(255),
    ]),
  });

  constructor() {}

  ngOnInit(): void {}

  saveNewMeal = (myForm: FormGroup): FormGroup => {
    return myForm.value;
  };

  sendMealToServer = () => {};
}

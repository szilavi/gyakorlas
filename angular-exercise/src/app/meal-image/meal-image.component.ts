import { Component, Input, OnInit } from '@angular/core';
import { Meal } from '../model/meal';

@Component({
  selector: 'app-meal-image',
  templateUrl: './meal-image.component.html',
  styleUrls: ['./meal-image.component.css'],
})
export class MealImageComponent implements OnInit {
  @Input() chosenMeal: Meal = new Meal();

  constructor() {}

  ngOnInit(): void {}
}

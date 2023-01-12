import { HttpService } from './../service/http.service';
import { Component, OnInit } from '@angular/core';
import { Meal } from '../model/meal';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css'],
})
export class MealListComponent implements OnInit {
  meals: Meal[] = [];

  actualMeal: Meal = {
    foodName: 'Tejbetök',
    price: 2,
    category: 'Starter',
    imageUrl: 'https://source.unsplash.com/-YHSwy6uqvk',
    id: 1,
  };

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.getMeals();
  }

  getMeals = () => {
    this.http.getMeal().subscribe((meal) => (this.meals = [...meal]));
  };

  changeMeal(meal: Meal): void {
    this.actualMeal = meal;
  }
}

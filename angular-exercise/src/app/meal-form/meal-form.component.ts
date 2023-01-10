import { Component, OnInit } from '@angular/core';
import {  FormGroup } from '@angular/forms';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.css']
})
export class MealFormComponent implements OnInit {

  myForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  saveNewMeal = () => {
    return {}
  }

  sendMealToServer = () => {

  }

}

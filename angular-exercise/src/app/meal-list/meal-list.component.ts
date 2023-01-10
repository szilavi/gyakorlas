import { HttpService } from './../service/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css']
})
export class MealListComponent implements OnInit {

  meals:any[] = [];

  constructor(private http: HttpService) { }

  ngOnInit(): void {
  }

  getMeals = () => {

  }


}

import { HttpClientModule } from '@angular/common/http';
import { MealListComponent } from './../meal-list/meal-list.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { MealFormComponent } from './meal-form.component';

describe('MealFormComponent elemeinek tesztelése', () => {
  let component: MealFormComponent;
  let fixture: ComponentFixture<MealFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealFormComponent ],
      imports: [ReactiveFormsModule, HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Meal komponens létrejön', () => {
    expect(component).toBeTruthy();
  });

  it('Label elemek megfelelő szöveggel rendelkeznek', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;

    const foodLabel = compiledComponent.querySelector('label[for="foodName"]');
    const priceLabel = compiledComponent.querySelector('label[for="price"]');
    const categoryLabel = compiledComponent.querySelector('label[for="category"]');
    const imageUrlLabel = compiledComponent.querySelector('label[for="imageUrl"]');

    expect(foodLabel).toBeTruthy();
    expect(priceLabel).toBeTruthy();
    expect(categoryLabel).toBeTruthy();
    expect(imageUrlLabel).toBeTruthy();

    expect(foodLabel.innerHTML).toBe("Food Name:");
    expect(priceLabel.innerHTML).toBe("Price:");
    expect(categoryLabel.innerHTML).toBe("Category:");
    expect(imageUrlLabel.innerHTML).toBe("Image:");
  });

  it('Mentés gomb létezésének tesztelése', ()=> {
    const compiledComponent  = fixture.debugElement.nativeElement;

    const button: HTMLButtonElement = compiledComponent.querySelector('button#saveButton');
    expect(button).toBeTruthy();
    expect(button.innerHTML).toBe('Save');
  });

});

describe('Validátor tesztek', ()=> {
  let component: MealFormComponent;
  let fixture: ComponentFixture<MealFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealFormComponent ],
      imports: [ReactiveFormsModule, HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('FoodName beviteli mező validálása', ()=> {
    const titleControl = component.myForm.controls['foodName'];
    expect(titleControl.valid).toBeFalsy();

    titleControl.setValue('3Eggs');
    expect(titleControl.valid).toBeFalsy();

    titleControl.setValue('Va');
    expect(titleControl.valid).toBeFalsy();

    titleControl.setValue('Hosszu vajas lekvaros zsemle falatok');
    expect(titleControl.valid).toBeFalsy();

    //Helyes beviteli mező esetén:
    titleControl.setValue('Vajas zsemle');
    expect(titleControl.valid).toBeTruthy();
  });

  it('Price tartalom validálása', ()=> {
    const textareaControl = component.myForm.controls['price'];
    expect(textareaControl.valid).toBeFalsy();

    textareaControl.setValue('szam');
    expect(textareaControl.valid).toBeFalsy();

    textareaControl.setValue(0)
    expect(textareaControl.valid).toBeFalsy();

    //Helyes beviteli mező esetén:
    textareaControl.setValue(100);
    expect(textareaControl.valid).toBeTruthy();
  });

  it('Kategória választás validálása', ()=> {
    const categoryControl = component.myForm.controls['category'];
    expect(categoryControl.valid).toBeFalsy();

    categoryControl.setValue('Soup');
    expect(categoryControl.valid).toBeTruthy();
  });

  it('Image Url validálása', ()=> {
    const imageUrlControl = component.myForm.controls['imageUrl'];
    expect(imageUrlControl.valid).toBeFalsy();

    imageUrlControl.setValue('www.pm.hu')
    expect(imageUrlControl.valid).toBeFalsy();

    imageUrlControl.setValue('http://valami');
    expect(imageUrlControl.valid).toBeTruthy();

    imageUrlControl.setValue('http://toooooooooooooooooooooooooooMuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuchChaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeersssssssssssssssssssssssssssss')
    expect(imageUrlControl.valid).toBeFalsy();

    imageUrlControl.setValue('https://valami');
    expect(imageUrlControl.valid).toBeTruthy();
  });

  it('Gomb csak akkor kattintható ha valid a form', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;

    // Kezdetben minden invalid
    const saveButton = compiledComponent.querySelector('button');
    expect(saveButton.disabled).toBeTruthy();

    const foodNameControl = component.myForm.controls['foodName'];
    const priceControl = component.myForm.controls['price'];
    const categoryControl = component.myForm.controls['category'];
    const imageControl = component.myForm.controls['imageUrl'];

    foodNameControl.setValue('Hamburger');
    priceControl.setValue(100);
    categoryControl.setValue('Main');
    imageControl.setValue('https://valami');

    fixture.detectChanges();

    expect(saveButton.disabled).toBeFalsy();
  });

  it('A savePost metódus meghívódik ha rátudnak kattintani a gombra', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;
    const saveButton = compiledComponent.querySelector('button');

    const mosckSaveFunction = spyOn(component, 'saveNewMeal');

    //Kezdetben nem lehet kattintható, nem hívódhat meg
    saveButton.click();
    expect(mosckSaveFunction).not.toHaveBeenCalled();

    // Valós értékeket veszünk fel, kattintható a gomb
    const foodNameControl = component.myForm.controls['foodName'];
    const priceControl = component.myForm.controls['price'];
    const categoryControl = component.myForm.controls['category'];
    const imageControl = component.myForm.controls['imageUrl'];

    foodNameControl.setValue('Hamburger');
    priceControl.setValue(1000);
    categoryControl.setValue('Main Dish');
    imageControl.setValue('https://valami');

    fixture.detectChanges();

    saveButton.click();
    expect(mosckSaveFunction).toHaveBeenCalledTimes(1);
  })

})

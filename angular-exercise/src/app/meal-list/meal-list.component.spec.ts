import { MealImageComponent } from './../meal-image/meal-image.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpService } from '../service/http.service';

import { MealListComponent } from './meal-list.component';

describe('MealListComponent', () => {
  let component: MealListComponent;
  let fixture: ComponentFixture<MealListComponent>;

  let mockHttpClient : {get: jasmine.Spy};
  let httpMockService : HttpService;
  let mockServerDBMeals:any = [];

  beforeEach(async () => {
    mockServerDBMeals = [
      {id: 1, foodName: "Hamburger", category: "Main course", price: 1000, imageUrl: 'https://hamburger'},
      {id: 2, foodName: "Sponge Cake", category: "Starter", price: 700, imageUrl: 'https://cake'},
      {id: 3, foodName: "Tiramisu", category: "Dessert", price: 900, imageUrl: 'https://tiramisu'},
      {id: 4, foodName: "Winner snitzel", category: "Main course", price: 1300, imageUrl: 'https://winner'},
      {id: 5, foodName: "Fishsoup", category: "Soup", price: 900, imageUrl: 'https://soup'},
    ];
    mockHttpClient = jasmine.createSpyObj('HttpClient', ['get']);
    httpMockService = new HttpService(mockHttpClient as any);
    mockHttpClient.get.and.returnValue(of(mockServerDBMeals));

    await TestBed.configureTestingModule({
      declarations: [ MealListComponent, MealImageComponent ],
      providers:[{provide: HttpService, useValue: httpMockService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Meal-list komponens létrejön', () => {
    expect(component).toBeTruthy();
  });

  it('GET kérés tesztelése, getMeals metódus meghívásakor felfrissül a helyi meals lista', ()=> {

    // HttpService getMeal metódus tesztelése
    (httpMockService.getMeal() as Observable<any>).subscribe(
      (mockServerMeals:any) => {
        expect(mockServerMeals).toEqual(mockServerDBMeals)
      }
    )

    // List komponens getMeals metódusa meghívja a service osztályt és frissiti a lokális listát
    component.getMeals();
    expect(component.meals).toEqual(mockServerDBMeals);
  });

  it('A komponens initalizálásakor megjelennek az adatok a tábla soraiban', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;
    fixture.detectChanges();

    const dataRows = compiledComponent.querySelectorAll('.table-row');
    expect(dataRows.length).toBe(5);

    const firstRow:any = compiledComponent.querySelectorAll('.table-row:nth-child(1) td');
    expect(firstRow[0].innerHTML).toBe('Hamburger');
    expect(firstRow[1].innerHTML).toBe('1000');
    expect(firstRow[2].innerHTML).toBe('Main course');

    const thirdRow:any = compiledComponent.querySelectorAll('.table-row:nth-child(3) td');
    expect(thirdRow[0].innerHTML).toBe('Tiramisu');
    expect(thirdRow[1].innerHTML).toBe('900');
    expect(thirdRow[2].innerHTML).toBe('Dessert');

    const fifthRow:any = compiledComponent.querySelectorAll('.table-row:nth-child(5) td');
    expect(fifthRow[0].innerHTML).toBe('Fishsoup');
    expect(fifthRow[1].innerHTML).toBe('900');
    expect(fifthRow[2].innerHTML).toBe('Soup');
  });

  it('A komponens initalizálásakor megjelennek gombok a tábla soraiban', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;
    fixture.detectChanges();

    const dataRows = compiledComponent.querySelectorAll('.table-row');
    expect(dataRows.length).toBe(5);

    const firstRow:any = compiledComponent.querySelectorAll('.table-row:nth-child(1) td');
    expect(firstRow[3].innerHTML.includes('<button')).toBeTruthy();
    expect(firstRow[3].innerHTML.includes('Image')).toBeTruthy();

    const thirdRow:any = compiledComponent.querySelectorAll('.table-row:nth-child(3) td');
    expect(thirdRow[3].innerHTML.includes('<button')).toBeTruthy();
    expect(thirdRow[3].innerHTML.includes('Image')).toBeTruthy();

    const fifthRow:any = compiledComponent.querySelectorAll('.table-row:nth-child(5) td');
    expect(fifthRow[3].innerHTML.includes('<button')).toBeTruthy();
    expect(fifthRow[3].innerHTML.includes('Image')).toBeTruthy();
  });

  it('Image gombokra kattintva megjelenik egy kép', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;
    const buttons = compiledComponent.querySelectorAll('.table-row button');

    const firstBtn: HTMLButtonElement = buttons[0];
    firstBtn.click();

    fixture.detectChanges();

    const imgElement: HTMLImageElement = compiledComponent.querySelector('section img');
    expect(imgElement).toBeTruthy();
    expect(imgElement.src).toBe('https://hamburger/');

    const thirdBtn: HTMLButtonElement = buttons[2];
    thirdBtn.click();

    fixture.detectChanges();
    expect(imgElement.src).toBe('https://tiramisu/');

    const fifthBtn: HTMLButtonElement = buttons[4];
    fifthBtn.click();

    fixture.detectChanges();
    expect(imgElement.src).toBe('https://soup/');

  })

});

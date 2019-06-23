import { Component, OnInit } from '@angular/core';
import { PizzaService, Pizza } from '../services/pizza.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  pizzas: Pizza[];


  constructor(private pizzaService: PizzaService) {}

  ngOnInit() {
    this.pizzaService.getPizzas().subscribe(res => {
      this.pizzas = res;
    });

  }
  remove(item) {
    this.pizzaService.removePizza(item.id);
  }
}

import { Component, OnInit } from '@angular/core';
import { Pizza, PizzaService } from 'src/app/services/pizza.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { HomePage } from 'src/app/home/home.page';
 

@Component({
  selector: 'app-pizza-details',
  templateUrl: './pizza-details.page.html',
  styleUrls: ['./pizza-details.page.scss'],
})
export class PizzaDetailsPage implements OnInit {
  pizza: Pizza = {
    task: 'Write pizza item',
    createdAt: new Date().getTime(),
    priority: 2,
    ingredient: ['', '']
  };
  pizzaId = null;
  constructor(private route: ActivatedRoute, private nav: NavController, private pizzaService: PizzaService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.pizzaId = this.route.snapshot.params['id'];
    if (this.pizzaId)  {
      this.loadPizza();
    }
  }
  async loadPizza() {
    const loading = await this.loadingController.create({
      message: 'Loading Pizza..'
    });
    await loading.present();
 
    this.pizzaService.getPizza(this.pizzaId).subscribe(res => {
      loading.dismiss();
      this.pizza = res;
    });
  }
 
  async savePizza() {
 
    const loading = await this.loadingController.create({
      message: 'Saving Pizza..'
    });
    await loading.present();
 
    if (this.pizzaId) {
      this.pizzaService.updatePizza(this.pizza, this.pizzaId).then(() => {
        loading.dismiss();
        this.nav.setDirection('back');
      });
    } else {
      this.pizzaService.addPizza(this.pizza).then(() => {
        loading.dismiss();
        this.nav.setDirection('back');
      });
    }
  }
 
}



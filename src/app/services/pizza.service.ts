import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Pizza {
  id?: string;
  task: string;
  priority: number;
  createdAt: number;
  ingredient: string[];
}
@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private pizzasCollection: AngularFirestoreCollection<Pizza>;
  private pizzas: Observable<Pizza[]>;
  constructor(db: AngularFirestore) { 
    this.pizzasCollection = db.collection<Pizza>('pizzas');
    this.pizzas = this.pizzasCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  getPizzas() {
    return this.pizzas;
  }
 getPizza(id) {
    return this.pizzasCollection.doc<Pizza>(id).valueChanges();
  }
 
  updatePizza(pizza: Pizza, id: string) {
    return this.pizzasCollection.doc(id).update(pizza);
  }
 
  addPizza(pizza: Pizza) {
    return this.pizzasCollection.add(pizza);
  }
 
  removePizza(id) {
    return this.pizzasCollection.doc(id).delete();
  }
  /*onNotifications() {
    return this.pizzasCollection.onNotificationOpen();
  }*/
  }


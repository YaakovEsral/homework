import { Component, OnInit } from '@angular/core';
import Item from '../shared/item';
import { Order } from '../shared/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

    order: Order = {
        person: {
            firstName: 'Yaakov',
            lastName: 'Esral',
            age: 24 
        },
        address: {
            street: '4800 Park Heights Ave.',
            city: 'Baltimore', 
            state: 'MD', 
            zip: '21208'
        },
        item: {
            name: 'Speaker',
            price: 25.49,
            quantity: 1
        },

        date: '01/12/21'
        
    }

}

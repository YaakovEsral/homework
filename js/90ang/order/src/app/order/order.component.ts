import { Component, OnInit } from '@angular/core';
import { orders } from '../orders';
import Item from '../shared/item';
import { Order } from '../shared/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{
    orders = orders;

    ngOnInit() {
        console.log(orders);
        
    }

        

}

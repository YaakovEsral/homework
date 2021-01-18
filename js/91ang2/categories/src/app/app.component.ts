import { Component } from '@angular/core';
import { Item } from 'src/shared/item';
import { categories } from './categories';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'categories';
  categories = categories;
  items!: any[];

  displayCategory(index:number) {
      this.items = (categories[index].items);
  }

  deleteItem(index: number) {
      this.items.splice(index, 1);
  }

  addItem(event: Event, item: any){
      event.preventDefault();
      this.items.push({name: item.name, subtitle: item.subtitle})
  }
}

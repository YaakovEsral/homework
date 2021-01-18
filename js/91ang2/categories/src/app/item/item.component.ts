import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/shared/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

    @Input() item!:Item;
    @Input() index!: number;
    @Output() deleteEvent = new EventEmitter<number>();

    handleDelete(index:number) {
        console.log(index);
        
        this.deleteEvent.emit(index);
    }

  constructor() { }

  ngOnInit(): void {
  }

}

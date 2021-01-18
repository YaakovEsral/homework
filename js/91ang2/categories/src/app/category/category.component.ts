import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/shared/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

    @Input() categories!:Category [];
    // @Input() displayCategories!: () => void;
    @Output() categorySelectEvent = new EventEmitter<number>();

    handleClick(index: number) {
        this.categorySelectEvent.emit(index); 
    }
    
    constructor() { }

  ngOnInit(): void {
  }

}

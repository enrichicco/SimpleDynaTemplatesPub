
//
// https://www.intertech.com/angular-development-6-dynamic-component-generation/
// https://github.com/IntertechInc/angular-blog-series-solution
//


import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dyna-button',
  templateUrl: './dyna-button.component.html',
  styleUrls: ['./dyna-button.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DynaButtonComponent implements OnInit {

  public created!: Date;
  @Input() type: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' = 'primary';
  @Output() remove = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.created = new Date();
  }

  getClass(): string {
    return !this.type ? 'primary' : `btn-${this.type}`;
  }

}

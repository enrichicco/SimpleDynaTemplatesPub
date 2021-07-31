
//
// https://www.intertech.com/angular-development-6-dynamic-component-generation/
// https://github.com/IntertechInc/angular-blog-series-solution
//

import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dyna-label',
  templateUrl: './dyna-label.component.html',
  styleUrls: ['./dyna-label.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class DynaLabelComponent implements OnInit {


	@Input() type: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' = 'primary';
	@Output() remove = new EventEmitter<any>();

	public created!: Date;

	ngOnInit(): void {
		this.created = new Date();
	}

	getClass(): string {
		return !this.type ? 'badge-primary' : `badge-${this.type}`;
	}
}
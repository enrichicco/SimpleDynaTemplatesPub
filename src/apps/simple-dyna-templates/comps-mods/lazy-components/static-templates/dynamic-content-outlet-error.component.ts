import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dynamic-content-outlet-error-component',
  template: `
<div>Error fetching component: {{ errorMessage }}<br/>
  <button type="button" class="close" (click)="remove.emit()">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
`
})
export class DynamicContentOutletErrorComponent {
  @Input() errorMessage: string = "ahio";
  @Output() remove = new EventEmitter<any>();
  constructor() { 
    console.log("error component lazy loaded is on!");
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dynamic-content-outlet-error-component',
  template: `
<div>dynamic component test 1, static html template
  <button type="button" class="close" (click)="remove.emit()">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
`
})
export class DynamicContentOutletTest1Component {
  @Output() remove = new EventEmitter<any>();
  constructor() {
    console.log("component 1 lazy loaded is on.");
  }
}

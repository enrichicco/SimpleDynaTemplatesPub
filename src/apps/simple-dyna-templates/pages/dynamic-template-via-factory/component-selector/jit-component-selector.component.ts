import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

export interface ComponentRequest {
	contextType: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
	componentType: 'button_00' | 'label_00' | 'staticHtml_XX_lazy' | 'dynaHtml_01' | 'dynaHtml_02_Lazy';
	viewPortSelected: number;
	viewPortsNumber: number;
  lazyCompId: number;
  dynamicHtml: string;
}

@Component({
  selector: 'jit-component-selector',
  templateUrl: './jit-component-selector.component.html',
  styleUrls: ['./jit-component-selector.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class JitComponentSelectorComponent implements OnInit {

	@Input() viewPorts: number[] = [];
	@Output() createComponent = new EventEmitter<ComponentRequest>();
  
  public dynamicHtml: string = 
  `<ul>
    <li *ngFor="let xxx of [1,2,3,4]">ngIndex: {{$index}} - array pos: {{xxx}} - value: {{xxx}}</li>
  </ul>`;
	public viewPortsNumber = 0;
	public viewPortSelected = 0;
	public componentType: 'button_00' | 'label_00' | 'staticHtml_XX_lazy' | 'dynaHtml_01' | 'dynaHtml_02_Lazy' = 'button_00';
	public contextType: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' = 'primary';
  public lazyCompId: number = 1;

  constructor() { }

  ngOnInit(): void {
    this.viewPortsNumber = this.viewPorts.length;
  }
  
	public createRequest() {
		this.createComponent.emit({
			viewPortSelected: this.viewPortSelected,
			viewPortsNumber: this.viewPortsNumber,
			componentType: this.componentType,
			contextType: this.contextType,
      lazyCompId: this.lazyCompId,
      dynamicHtml: this.dynamicHtml
		});
	}


}

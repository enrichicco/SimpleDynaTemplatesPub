import { createComponent } from "@angular/compiler/src/core";
import { Component, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from "@angular/core";
import { DynamicHtmlTemplateWrapperIvyRendered } from "src/services/dyna-components/dynamic-template-ivy-rendered-outlet-service/dynamic-template-component-wrapper-interface";
import { DynamicTemplateIvyRenderedOutletService } from "src/services/dyna-components/dynamic-template-ivy-rendered-outlet-service/dynamic-template-ivy-rendered-outlet-service";


@Component({
  template: `
<ng-container #container></ng-container><br/>
<button type="button" class="close" (click)="remove.emit()">
  <span aria-hidden="true">&times;</span>
</button>`
})
export class DynamicHtmlContentOutletTestComponent implements OnInit , DynamicHtmlTemplateWrapperIvyRendered{

  static __name__: string = "HomeDynaSoftComponent";
  // The container that will have the dynamic template
  @ViewChild('container', { read: ViewContainerRef, static: true }) _elementRef!: ViewContainerRef;
  @Output('remove')remove: EventEmitter<any> = new EventEmitter<any>();
  public extHtmlTemplate: string = "hello world";
  data: any = {};
  dynamicComponent: any;

  constructor(
    private jitTemplateService: DynamicTemplateIvyRenderedOutletService,
    // private htmlTemplateDispenser: 
    ){

  }

  ngOnInit(){
    const _template: string = `<p>this dynamic html component relies on lazy loaded component</p>\n`;
    let subComponent = this.createSubComponent(_template);
    const generatorPromyResult = this.jitTemplateService.generateDynamicAndPut(this._elementRef, subComponent)
    .then(result => {
      this.dynamicComponent = result && result.bStatus ? result.componentRef : undefined;
    });
  }
  private createSubComponent(_template: string) {
    const _subcomponent = Component({
        template: _template 
    // , providers: [TranslateModule, {provide: "translate", useClass: TranslatePipe, multi: false}]
  
    })( 
      class ChildComponent implements OnInit {
        remove: EventEmitter<any> = new EventEmitter<any>();

        constructor(){
          Output('remove')(this.remove);
        }
        ngOnInit(){
  
        }
  
      }
    );
    return _subcomponent;
  }
}
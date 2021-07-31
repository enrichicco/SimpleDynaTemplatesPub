import { Component, ComponentFactory, ComponentRef, EventEmitter, OnInit, Output, QueryList, ViewChild, ViewChildren, ViewContainerRef, ViewRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { DynamicComponentService, Twins } from 'src/services/dyna-components/dynamic-component-service/dynamic-component.service';
import { DynamicHtmlTemplateWrapperIvyRendered } from 'src/services/dyna-components/dynamic-template-ivy-rendered-outlet-service/dynamic-template-component-wrapper-interface';
import { DynamicTemplateIvyRenderedOutletService } from 'src/services/dyna-components/dynamic-template-ivy-rendered-outlet-service/dynamic-template-ivy-rendered-outlet-service';
import { StaticTemplateIvyRenderedOutletService } from 'src/services/dyna-components/static-template-ivy-rendered-outlet-service/static-template-ivy-rendered-outlet-service';
import { DynaButtonComponent } from '../../comps-mods/eager-components/dyna-button/dyna-button.component';
import { DynaLabelComponent } from '../../comps-mods/eager-components/dyna-label/dyna-label.component';
import { ComponentRequest } from './component-selector/jit-component-selector.component';




@Component({
  selector: 'jit-dynamic-template-via-factory',
  templateUrl: './dynamic-template-via-factory.component.html',
  styleUrls: ['./dynamic-template-via-factory.component.css']
})
export class DynamicTemplateViaFactoryComponent implements OnInit {



  // block 1: just one dynamic component
  // dynamicComponent: any;
  // @ViewChild('componentRef1', { read: ViewContainerRef, static: true }) _dynaCompPositionViewRef!: ViewContainerRef;
  // @ViewRef('componentRef1', {}) dynaCompPositionViewRef : ViewRef;


  // block 2: dynamic components set
  compToDisplay: string = '';
	public viewPorts: number[] = [1, 2, 3, 4];
  public viewPortSelected: number = 0;

	private components: ComponentRef<any>[] = [];
	@ViewChildren('componentTarget', {read: ViewContainerRef}) targets!: QueryList<ViewContainerRef>;





  constructor(
    private jitTemplateService: DynamicTemplateIvyRenderedOutletService,
    private dynaComponentFactory: DynamicComponentService,
    private dynamicContentOutletServiceNew: StaticTemplateIvyRenderedOutletService
  ) {
    
    this.dynaComponentFactory.loadFactories(...this.itemsForService());
  } 
  private itemsForService(): Twins<any>[]{
    return [
      {
        "name": "button_00"
        , component: DynaButtonComponent
      }, {
        "name": "label_00"
        , component: DynaLabelComponent
      }
      
    ];
  }

  ngOnInit(): void {
  }

  private getTargetViewPort(request: ComponentRequest): ViewContainerRef {
    const target = this.targets.toArray()[request.viewPortSelected%this.viewPorts.length];
    return target;
  }
  private activateDestroyer(componentRef: ComponentRef<any>){
    const cprfRem: Subscription = componentRef.instance.remove.subscribe(
      () => {
        componentRef.destroy();
        setTimeout(() => cprfRem.unsubscribe(),500);
      }
    );
    this.components.push(componentRef);
  }

  private putComponentInSelectedViewPort(request: ComponentRequest, factory: ComponentFactory<unknown>): void {
    const target = this.getTargetViewPort(request);
    const componentRef: ComponentRef<any> = target.createComponent(factory);
    componentRef.instance.type = request.contextType;
    const cprfRem: Subscription = componentRef.instance.remove.subscribe(
      () => {
        componentRef.destroy();
        setTimeout(() => cprfRem.unsubscribe(),500);
      }
    );
    this.components.push(componentRef);
  }

	public addToViewport(request: ComponentRequest): void {
    // request.componentType === 'button' ? this.buttonFactory : this.alertFactory;
    if (request.viewPortsNumber !== this.viewPorts.length) {
      this.viewPorts = new Array<number>(request.viewPortsNumber);
    } else {
      switch(request.componentType) {
        case 'button_00':
        case 'label_00': {
            const factory = this.dynaComponentFactory.getFactory(request.componentType);
            if (factory) {
              this.putComponentInSelectedViewPort(request, factory);
            }
          }
          break;
        case 'staticHtml_XX_lazy': {
            const xxx: number = request.lazyCompId;
            const compName: string = `dynamicContentOutletTest${xxx}Component`
            const target = this.getTargetViewPort(request);
            this.dynamicContentOutletServiceNew.drawComponentWithModuleInViewRef(
              "dynamicContentOutletModule1", compName, target
            )
            .then(cmpRef => this.activateDestroyer(cmpRef));
          }
          break;
        case 'dynaHtml_01': {
            const target = this.getTargetViewPort(request);
            const htmlTemplate = `
${request.dynamicHtml}
<div><button type="button" class="close" (click)="remove.emit()">
  <span aria-hidden="true">&times;</span>
</button></div>`;
            this.createDyCoDyTe(htmlTemplate, 1, target);
          }
          break;
        case 'dynaHtml_02_Lazy': {
            const target = this.getTargetViewPort(request);
            const htmlTemplate = request.dynamicHtml;
            this.dynamicContentOutletServiceNew.drawComponentWithModuleInViewRef("dynamicContentOutletModule1", "dynamicHtmlContentOutletTestComponent", target /*this._dynaCompPositionViewRef */)
            .then(cmpRef => {
              this.activateDestroyer(cmpRef);
              (cmpRef.instance as DynamicHtmlTemplateWrapperIvyRendered).buildSubcomponent(htmlTemplate);
            });
          }
          break;
      }
    }
	}  

  destroyDynamicComponent(){
    /*
    if (this.dynamicComponent) {
      this.dynamicComponent.destroy();
      this.dynamicComponent = null;
    }
    */
  }

  //
  // create dynamic component with dynamic (html) template
  public async createDyCoDyTe(_template: string, compId: number, compViewRef: ViewContainerRef){
    // first, remove old component (if any)
    this.destroyDynamicComponent();
    // build footerData
    _template = `<p>this dynamic html component relies on component code id = ${compId}</p>\n` + _template;
    let subComponent = this.createSubComponent(_template, compId);
    const generatorPromyResult = await this.jitTemplateService.generateDynamicAndPut(compViewRef /* this._dynaCompPositionViewRef */, subComponent)
    .then(cmpRef => {
      if (cmpRef && cmpRef.status && cmpRef.componentRef) {
        this.activateDestroyer(cmpRef.componentRef)
        return cmpRef.componentRef
      }
      return undefined;      
    });
    // this.dynamicComponent = generatorPromyResult && generatorPromyResult.bStatus ? generatorPromyResult.componentRef : undefined;
  }



  private createSubComponent(_template: string, whichOne: number) {
    _template = _template && _template.length > 0 ? _template : '<p> dynamic html template was empty </p>';
    const _subcomponent = Component({
        template: _template
        // , providers: [TranslateModule, {provide: "translate", useClass: TranslatePipe, multi: false}]

    })(whichOne === 1 ? 
      class ChildComponent implements OnInit {
        remove: EventEmitter<any> = new EventEmitter<any>();
        constructor(){
          Output('remove')(this.remove);
        }
        ngOnInit(){

        }

      } : 
      class ChildComponent implements OnInit {
        remove: EventEmitter<any> = Output()(new EventEmitter<any>());
        constructor(){

        }
        ngOnInit(){

        }

      }
    );
    return _subcomponent;
  }
  
}

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from "@ngx-translate/core";
// import { SandboxModule } from "src/app/sandbox/sandbox.module";
// import { Mappings } from "src/app/sandbox/src/app/services/core/api/apiMapping";
import { MetadataService } from "./angular11-meta";





describe('MetadataService', () => {
  let service: MetadataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ] // Mappings ] //, Mappings, TranslateService,  TranslateStore, TranslateLoader, TranslateCompiler]
      , imports: [
        RouterTestingModule, HttpClientTestingModule // , SandboxModule
        , TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })
      ]
    });
    service = TestBed.inject(MetadataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should create a meta, then test it is there', () => {
    //
    // set tags
    service.updateMetadata({
      title: `metadata unit test`,
      description: `this is a test on the root scope - ${service.isRoot}`
    });
    service.setTitle('metadata unit test');
    // fetch tags
    const theElem = service.getMetaTag("content='metadata unit test'");
    const theMetaTitle = theElem ? (theElem.attributes.getNamedItem("content") || {value:'null' }).value : 'null';
    const tagTtile: string = (document || {title: 'document is null...'}).title;
    // test
    expect((tagTtile === 'metadata unit test' ) && (theMetaTitle === 'metadata unit test')).toBeTruthy();
  });
})

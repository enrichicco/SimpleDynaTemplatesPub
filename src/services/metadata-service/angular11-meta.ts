

//
// 20210312 - updated meta generator to latest angular interface (11 and 12)
//             this should be compatible with the SSR/universal inclusion
//


import { /* Inject, */ ElementRef, Injectable} from '@angular/core';
import {Meta, MetaDefinition, Title} from '@angular/platform-browser';
// import {HOST_URL} from './tokens/host-url';
import { Router } from '@angular/router';
// import { SandboxModule } from 'src/app/sandbox/sandbox.module';
import { environment } from 'src/environments/environment';

export interface PageMetadata {
  title: string;
  imageRelativeUrl: string;
  description: string;
  author: string;
  keywords: string[];
  type: string;
}

const defaultMetadata: PageMetadata = {
  title: 'WscCmsPrint',
  imageRelativeUrl: 'og-default.png',
  description: 'new wscms ng12 app',
  author: 'Dynamic Soft',
  keywords: ['Angular', 'meta tags', 'Angular Universal'],
  type: 'website',
}

@Injectable({
  providedIn:  'root' // SandboxModule
})
export class MetadataService {
  hostUrl: string;
  isRoot: boolean = false;
  constructor(private metaTagService: Meta,
              private titleService: Title,
              /* @Inject(HOST_URL) private hostUrl: string,  */
              private router: Router
              ) {
    this.hostUrl = environment.API_URL;
  }

  public getMetaTag(selectExpression: string) {
    return this.metaTagService.getTag(selectExpression);
  }

  public setTitle(title:string){
    this.titleService.setTitle(title);
  }

  public buildMetasSet(metadata: Partial<PageMetadata>, index: boolean = true): MetaDefinition[] {

    const pageMetadata: PageMetadata = {...defaultMetadata, ...metadata};
    const metatags: MetaDefinition[] = this.generateMetaDefinitions(pageMetadata);

    metatags.push (
      { property: 'og:url', content: `${this.hostUrl}${this.router.url}`},
      { name: 'robots', content: index ? 'index, follow' : 'noindex' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' }
    );

    return metatags;
  }

  public addMetadata(metadata: Partial<PageMetadata>, index: boolean = true): void {
    const metatags: MetaDefinition[] = this.buildMetasSet(metadata, index);
    this.metaTagService.addTags(metatags, false);
  }

  public updateMetadata(metadata: Partial<PageMetadata>, index: boolean = true): void {
    const metatags: MetaDefinition[] = this.buildMetasSet(metadata, index);
    this.updateMetadataRaw(metatags, true);
  }

  public updateMetadataRaw(metatags: MetaDefinition[], index: boolean = true): void {
    metatags.forEach(
      tagItem => {
        // patch for meta http-equiv and meta charset selectors
        if(tagItem && (Object.keys(tagItem).includes('http-equiv') || (Object.keys(tagItem).includes('charset') ))) {
          // theElem: ElementRef = this.renderer.destroyNode();
          let theKey: string = tagItem['http-equiv'] ? 'http-equiv' : 'charset';
          let theElem: HTMLMetaElement | null = this.metaTagService.getTag(`${theKey}='${tagItem[theKey]}'`);
          if (theElem) {
            // this.metaTagService.removeTagElement(theElem);
            this.metaTagService.updateTag(tagItem, `${theKey}='${tagItem[theKey]}'`);
          } else {
            this.metaTagService.updateTag(tagItem);
          }
        } else {
          this.metaTagService.updateTag(tagItem);
        }
      }
    )
  }

  private generateMetaDefinitions(metadata: PageMetadata): MetaDefinition[] {
    return [
      { name: 'title', content: metadata.title },
      { property: 'og:title', content: metadata.title },

      { name: 'description', content: metadata.description },
      { property: 'og:description', content: metadata.description },

      { name: 'author', content: metadata.author },
      { property: 'og:author', content: metadata.author },

      { name: 'keywords', content: metadata.keywords.join(', ') },

      { property: 'og:type', content: metadata.type },

      { property: 'og:image', content: `${this.hostUrl}${metadata.imageRelativeUrl}`}
    ]
  }
}

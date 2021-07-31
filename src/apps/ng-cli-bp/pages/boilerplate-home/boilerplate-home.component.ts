import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MetadataService } from 'src/services/metadata-service/angular11-meta';
// import { Router } from '@angular/router'; //import router

@Component({
  selector: 'app-boilerplate-home',
  templateUrl: './boilerplate-home.component.html',
  styleUrls: ['./boilerplate-home.component.css']
})
export class BoilerplateHomeComponent implements OnInit {
  static __name__: string = "HomeComponent";
  headerEnabler: boolean = true;
  theLUrl: string = "";
  constructor(
    private metadataService: MetadataService,
    private activatedRoute: ActivatedRoute,
    private locationService: Location,
  ) {
    // 1) this one gives strange results
    const theRUrl: string = this.activatedRoute.toString();
    // 2) this one works
    this.theLUrl = this.locationService.path();

   }

  ngOnInit(): void {

    if (this.metadataService) {
      this.metadataService.updateMetadata({
        title: 'Page home',
        description: `There is some content on page sandbox runner - ${this.metadataService.isRoot}`
      });
      console.log("metadata service scope test: ", this.metadataService.isRoot);
    }


  }

}

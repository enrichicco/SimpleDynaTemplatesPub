import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularAdsComponent } from './angular-ads.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AngularAdsComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AngularAdsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'simpleDynaTemplates'`, () => {
    const fixture = TestBed.createComponent(AngularAdsComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('simpleDynaTemplates');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AngularAdsComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('simpleDynaTemplates app is running!');
  });
});

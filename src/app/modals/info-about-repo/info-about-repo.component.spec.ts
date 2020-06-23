import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAboutRepoComponent } from './info-about-repo.component';

describe('InfoAboutRepoComponent', () => {
  let component: InfoAboutRepoComponent;
  let fixture: ComponentFixture<InfoAboutRepoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoAboutRepoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAboutRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

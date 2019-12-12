import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BelowNavComponent } from './below-nav.component';

describe('BelowNavComponent', () => {
  let component: BelowNavComponent;
  let fixture: ComponentFixture<BelowNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BelowNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BelowNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

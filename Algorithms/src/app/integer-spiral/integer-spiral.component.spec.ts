import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegerSpiralComponent } from './integer-spiral.component';

describe('IntegerSpiralComponent', () => {
  let component: IntegerSpiralComponent;
  let fixture: ComponentFixture<IntegerSpiralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegerSpiralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegerSpiralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

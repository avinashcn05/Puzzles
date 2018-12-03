import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFixCalculatorComponent } from './post-fix-calculator.component';

describe('PostFixCalculatorComponent', () => {
  let component: PostFixCalculatorComponent;
  let fixture: ComponentFixture<PostFixCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostFixCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFixCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

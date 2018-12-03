import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckWriterComponent } from './check-writer.component';

describe('CheckWriterComponent', () => {
  let component: CheckWriterComponent;
  let fixture: ComponentFixture<CheckWriterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckWriterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckWriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

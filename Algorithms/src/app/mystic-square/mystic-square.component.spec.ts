import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MysticSquareComponent } from './mystic-square.component';

describe('MysticSquareComponent', () => {
  let component: MysticSquareComponent;
  let fixture: ComponentFixture<MysticSquareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MysticSquareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MysticSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

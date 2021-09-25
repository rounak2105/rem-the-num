import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LdrboardComponent } from './ldrboard.component';

describe('LdrboardComponent', () => {
  let component: LdrboardComponent;
  let fixture: ComponentFixture<LdrboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LdrboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LdrboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

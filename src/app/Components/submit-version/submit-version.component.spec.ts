import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitVersionComponent } from './submit-version.component';

describe('SubmitVersionComponent', () => {
  let component: SubmitVersionComponent;
  let fixture: ComponentFixture<SubmitVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulPostModalComponent } from './successful-post-modal.component';

describe('SuccessfulPostModalComponent', () => {
  let component: SuccessfulPostModalComponent;
  let fixture: ComponentFixture<SuccessfulPostModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessfulPostModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulPostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWrapper } from './modal-wrapper.component';

describe('ModalNewEventComponent', () => {
  let component: ModalWrapper;
  let fixture: ComponentFixture<ModalWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalWrapper ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormDialog } from './edit-form-dialog.component';

describe('EditFormDialog', () => {
  let component: EditFormDialog;
  let fixture: ComponentFixture<EditFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFormDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFormDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

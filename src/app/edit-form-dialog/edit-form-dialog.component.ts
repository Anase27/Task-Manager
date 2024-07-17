import {ChangeDetectionStrategy, Component, inject, model, signal,Output, EventEmitter, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {v4 as uuidv4} from 'uuid';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { Task } from '../task-list/task.model';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';

export interface DialogData {
  id?: string;
  name: string;
  description: string;
  duedate: string;
  priorityLevel: string;
  status?: string;

}


@Component({
  selector: 'app-task-edit-button',
  standalone: true,
  imports: [MatIconModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  // templateUrl: './task-edit-button.component.html',
  styleUrl: './edit-form-dialog.component.css',
  template: `<button class="task-button" (click)="openDialog()"><mat-icon>edit</mat-icon></button>`
})
export class TaskEditButtonComponent {
  readonly name = signal('');
  readonly description = signal('');
  readonly duedate = signal('');
  readonly priorityLevel = signal('');
  readonly id = signal("");
  readonly status = signal("");
  @Input() task!:Task;
  @Output() editTask = new EventEmitter<Task>();
  readonly dialog = inject(MatDialog);
  parseDateString = (dateString: string): Date=> {
    // Split date and time
    const [datePart, timePart] = dateString.split(', ');
  
    // Split day, month, year
    const [dd, MM, yyyy] = datePart.split('/').map(Number);
  
    // Create a new Date object
    return new Date(yyyy, MM - 1,dd);
  }
  openDialog(): void {
  
    const dialogRef = this.dialog.open(EditFormDialog, {
      
      data: {
        ...this.task,
        duedate:this.parseDateString(this.task.duedate),
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log(new Date(this.task.duedate));

      console.log('The dialog was closed');
      // console.log(result);
      if (result !== undefined && result.name !== '') {
        // result.id = this.task.id;
        // result.status = this.task.status;
        result.duedate = new Date(result.duedate).toLocaleString();
        this.editTask.emit(result);
        console.log(result);
      }
    });

  }
}


@Component({
  selector: 'edit-form-dialog',
  providers: [provideNativeDateAdapter()],
  // templateUrl: '../task-form-dialog.component.html',
  template: `
    <h2 mat-dialog-title>Editing task:</h2><p class="task-id" >id: {{data.id}}</p>
    <mat-dialog-content style="height:340px; width:440px">
      <!-- <p>What's your favorite animal?</p> -->
      <div class="form" >
        
        <mat-form-field>
          <mat-label>Task Name</mat-label>
          <input matInput [(ngModel)]="data.name" />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Description</mat-label>
          <input matInput [(ngModel)]="data.description" />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Choose a date</mat-label>
          <input matInput [min]="minDate" [(ngModel)]="data.duedate" [matDatepicker]="picker" disabled/>
          <mat-hint>MM/DD/YYYY</mat-hint>
          <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker disabled="false"></mat-datepicker>
        </mat-form-field>

        <!-- <mat-form-field> -->
          <div style="display:flex; flex-direction: column;margin-top:15px">
            <label id="example-radio-group-label"><b>Pick priority level:</b> </label>
            <mat-radio-group
              aria-labelledby="example-radio-group-label"
              class="example-radio-group"
              [(ngModel)]="data.priorityLevel">
              @for (priority of priorityList; track priority) {
                <mat-radio-button [class]="priority+'-priority-button'" [id]="priority+'-priority-button'" [value]="priority">{{priority}}</mat-radio-button>
              }
            </mat-radio-group>
            <!-- <div>Your favorite season is: {{priorityLevel}}</div> -->
          </div>
        <!-- </mat-form-field> -->
        <section class="">
          <span><b>Status: </b></span>
          <mat-checkbox class="" [(ngModel)]="isCompleted">Completed</mat-checkbox>
        </section>

      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button (click)="onConfirmEdits()" cdkFocusInitial>Confirm edits</button>  
    </mat-dialog-actions>
    
  `,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDatepickerModule,
    MatRadioModule,
    MatCheckboxModule
  ],
  styleUrl:'edit-form-dialog.component.css'
})

export class EditFormDialog {
  readonly dialogRef = inject(MatDialogRef<EditFormDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly minDate = new Date();
  isCompleted = this.data.status === "completed";
  // priorityLevel: string = this.data.priorityLevel;
  priorityList: string[] = ['low', 'medium', 'high'];

  onNoClick(): void {
    this.dialogRef.close();
  }
  onConfirmEdits(){
    this.data.status = this.isCompleted ? "completed" : "pending";
    this.dialogRef.close(this.data);
  }
}
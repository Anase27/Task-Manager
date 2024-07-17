import {ChangeDetectionStrategy, Component, inject, model, signal,Output, EventEmitter, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
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
  selector: 'app-task-detail-button',
  standalone: true,
  imports: [MatIconModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  // templateUrl: './task-edit-button.component.html',
  styleUrl: './task-details.component.css',
  template: `<button class="task-button" (click)="openDialog()">Details</button>`
})

export class TaskDetailButtonComponent {
  @Input() task!:Task;
  readonly dialog = inject(MatDialog);

  // parseDateString = (dateString: string): Date=> {
  //   // Split date and time
  //   const [datePart, timePart] = dateString.split(', ');
  
  //   // Split day, month, year
  //   const [dd, MM, yyyy] = datePart.split('/').map(Number);
  
  //   // Create a new Date object
  //   return new Date(yyyy, MM - 1,dd);
  // }
  openDialog(): void {
  
    const dialogRef = this.dialog.open(TaskDetailsComponent, {
      
      data: {
        ...this.task,
        // duedate:this.parseDateString(this.task.duedate),
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log(new Date(this.task.duedate));

      console.log('The dialog was closed');
      // console.log(result);
      // if (result !== undefined && result.name !== '') {
      //   // result.id = this.task.id;
      //   // result.status = this.task.status;
      //   result.duedate = new Date(result.duedate).toLocaleString();
      //   // this.editTask.emit(result);
      //   console.log(result);
      // }
    });

  }
}

@Component({
  selector: 'app-task-details',
  // standalone: true,
  // imports: [],
  template: `
    <h2 mat-dialog-title>Task Details:</h2><span class="task-id" >id: {{data.id}}</span>
    <mat-dialog-content style="max-height:340px; width:440px">
      <!-- <p>What's your favorite animal?</p> -->
      <div class="form" >
        <div class="task-details-div">
          <div class="task-detail"><span class="field-title">Name:</span><span>{{data.name}}</span></div>
          <div class="task-detail"><span class="field-title">Description:</span><span>{{data.description}}</span></div>
          <div class="task-detail"><span class="field-title">DueBy:</span><span>{{data.duedate.split(',')[0]}}</span></div>
          <!-- <div class="task-detail"><span class="field-title">Description:</span><span>{{data.description}}</span></div> -->
          <div class="task-detail"><span class="field-title">Priority:</span><span>{{data.priorityLevel}}</span></div>
          <div class="task-detail"><span class="field-title">Status:</span><span>{{data.status}}</span></div>

        </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
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
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent {
  // @Input task:Task;

  readonly dialogRef = inject(MatDialogRef<TaskDetailsComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly minDate = new Date();
  // isCompleted = this.data.status === "completed";
  // // priorityLevel: string = this.data.priorityLevel;
  // priorityList: string[] = ['low', 'medium', 'high'];

  onNoClick(): void {
    this.dialogRef.close();
  }

}


import {Component, Inject} from '@angular/core';
import {UserEvent} from "../model/userEvent";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-update-event-dialog',
  templateUrl: './update-event-dialog.component.html',
  styleUrls: ['./update-event-dialog.component.css']
})
export class UpdateEventDialogComponent {
  userEvent: UserEvent = {id: 2, name: '', date: new Date()};

  constructor(
    public dialogRef: MatDialogRef<UpdateEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { selectedDate: Date }
  ) {
    this.userEvent.date = new Date(data.selectedDate.getTime() - data.selectedDate.getTimezoneOffset() * 60000);
  }

  onAddEvent(): void {
    if (this.userEvent.name.length >= 1 && this.userEvent.date != null)
      this.dialogRef.close(this.userEvent);
  }
}

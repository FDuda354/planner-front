import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EventDialogComponent} from "./event-dialog/event-dialog.component";
import {UserEvent} from "./model/userEvent";
import {CalendarService} from "./calendar.service";
import {AdminConfirmDialogService} from "../admin/common/service/admin-confirm-dialog.service";


export interface Day {
  number: string;
  data: UserEvent[];
  isCurrentMonth: boolean;
}

export interface CalendarComponent {
  monthYear: string;
  days: Day[];
  selectedYear: number;
  selectedMonth: number;
  years: number[];

  onDayClick(day: Day): void;

  onChangeYear(year: number): void;

  prevMonth(): void;

  nextMonth(): void;

  goToCurrentMonth(): void;
}


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() data = new Array<UserEvent>();

  monthYear!: string;
  days!: Day[];
  selectedYear: number;
  selectedMonth: number;
  years: number[];

  constructor(
    public dialog: MatDialog,
    private calendarService: CalendarService,
    private adminConfirmDialogService: AdminConfirmDialogService,
  ) {
    const currentDate = new Date();
    this.selectedYear = currentDate.getFullYear();
    this.selectedMonth = currentDate.getMonth();
    this.years = Array(10)
      .fill(currentDate.getFullYear())
      .map((x, y) => x + y);
    this.generateCalendar(this.selectedYear, this.selectedMonth);
  }

  ngOnInit() {
    this.calendarService.getEvents().subscribe((data: UserEvent[]) => {
      this.data = data.map(event => ({
        ...event,
        date: new Date(event.date)
      }));
      this.generateCalendar(this.selectedYear, this.selectedMonth);
    });

  }

  onDayClick(day: Day): void {
    if (day.isCurrentMonth) {
      const selectedDate = new Date(this.selectedYear, this.selectedMonth, parseInt(day.number));
      const dialogRef = this.dialog.open(EventDialogComponent, {
        data: {selectedDate}
      });
      dialogRef.afterClosed().subscribe((result: UserEvent) => {
        if (result) {

          this.calendarService.addEvent(result).subscribe((data: UserEvent) => {
              this.data.push({
                ...result,
                id: data.id,
                date: new Date(result.date)
              });
              this.generateCalendar(this.selectedYear, this.selectedMonth);
            }
          );
        }
      });
    }
  }

  onChangeYear(year: number): void {
    this.selectedYear = year;
    this.generateCalendar(this.selectedYear, this.selectedMonth);
  }

  prevMonth(): void {
    if (this.selectedMonth === 0) {
      this.selectedMonth = 11;
      this.selectedYear--;
    } else {
      this.selectedMonth--;
    }
    this.generateCalendar(this.selectedYear, this.selectedMonth);
  }

  nextMonth(): void {
    if (this.selectedMonth === 11) {
      this.selectedMonth = 0;
      this.selectedYear++;
    } else {
      this.selectedMonth++;
    }
    this.generateCalendar(this.selectedYear, this.selectedMonth);
  }

  goToCurrentMonth(): void {
    const currentDate = new Date();
    this.selectedYear = currentDate.getFullYear();
    this.selectedMonth = currentDate.getMonth();
    this.generateCalendar(this.selectedYear, this.selectedMonth);
  }

  private generateCalendar(year: number, month: number): void {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: Day[] = [];
    let lastMonthDayNumber = new Date(year, month, 0).getDate();
    let dayNumber = 1;
    let nextMonthDayNumber = 1;

    for (let i = 0; i < 42; i++) {
      if (i < firstDayOfMonth) {
        let events: UserEvent[] = [];
        this.data.forEach(element => {
          if (
            element.date.getFullYear() === year &&
            element.date.getMonth() === month - 1 &&
            element.date.getDate() === lastMonthDayNumber
          ) {
            events.push(element);
          }
        });
        days.push({
          number: lastMonthDayNumber.toString(),
          data: events,
          isCurrentMonth: false
        });
        lastMonthDayNumber++;
      } else if (i >= firstDayOfMonth && dayNumber <= daysInMonth) {
        let events: UserEvent[] = [];
        this.data.forEach(element => {
          if (
            element.date.getFullYear() === year &&
            element.date.getMonth() === month &&
            element.date.getDate() === dayNumber
          ) {
            events.push(element);

          }
        });
        days.push({
          number: dayNumber.toString(),
          data: events,
          isCurrentMonth: true
        });
        dayNumber++;
      } else {
        let events: UserEvent[] = [];
        this.data.forEach(element => {
          if (
            element.date.getFullYear() === year &&
            element.date.getMonth() === month + 1 &&
            element.date.getDate() === nextMonthDayNumber
          ) {
            events.push(element);
          }
        });
        days.push({
          number: nextMonthDayNumber.toString(),
          data: events,
          isCurrentMonth: false
        });
        nextMonthDayNumber++;
      }
    }

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    this.monthYear = `${monthNames[month]} ${year}`;
    this.days = days;
  }


  confirmDelete(id: number, event: MouseEvent) {
    event.stopPropagation();
    this.adminConfirmDialogService.openDialog("delete this event?")
      .afterClosed()
      .subscribe(confirmed => {
        if (confirmed) {
          this.calendarService.deleteEvent(id).subscribe(() => {
            this.data = this.data.filter(event => event.id !== id);
            this.generateCalendar(this.selectedYear, this.selectedMonth);
          });
        }
      });
  }
}

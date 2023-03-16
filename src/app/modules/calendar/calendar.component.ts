import {Component, Input, OnInit} from '@angular/core';

export interface Day {
  number: string;
  data: string;
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
export class CalendarComponent implements OnInit{
  @Input() data!: any[];

  monthYear!: string;
  days!: Day[];
  selectedYear: number;
  selectedMonth: number;
  years: number[];

  constructor() {
    const currentDate = new Date();
    this.selectedYear = currentDate.getFullYear();
    this.selectedMonth = currentDate.getMonth();
    this.years = Array(10)
      .fill(currentDate.getFullYear())
      .map((x, y) => x + y);
    this.generateCalendar(this.selectedYear, this.selectedMonth);
  }

  onDayClick(day: Day): void {
    if (day.isCurrentMonth) {
      console.log(`Clicked on day ${day.number}`);
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
        days.push({
          number: lastMonthDayNumber.toString(),
          data: '',
          isCurrentMonth: false
        });
        lastMonthDayNumber++;
      } else if (i >= firstDayOfMonth && dayNumber <= daysInMonth) {
        days.push({
          number: dayNumber.toString(),
          data: '',
          isCurrentMonth: true
        });
        dayNumber++;
      } else {
        days.push({
          number: nextMonthDayNumber.toString(),
          data: '',
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

  ngOnInit() {
    this.data.forEach(element => {
      this.days.forEach(day => {
        if (day.number === element.day && day.isCurrentMonth) {
          day.data = element.data;
        }
      });
    });

  }
}

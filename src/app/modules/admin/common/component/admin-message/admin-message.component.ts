import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminMessageService} from "../../service/admin-message.service";

@Component({
  selector: 'app-admin-message',
  templateUrl: './admin-message.component.html',
  styleUrls: ['./admin-message.component.css']
})
export class AdminMessageComponent implements OnInit, OnDestroy {

  messages: Array<string> = [];
  private clickCounter: number = 0;

  constructor(private adminMessageService: AdminMessageService) {
  }

  ngOnInit(): void {
    this.adminMessageService.subject.subscribe({
      next: messages => {
        this.messages = messages;
        this.clickCounter++;
        this.timeoutConsoleMessage();
      }
    });
  }

  clearMessages() {
    this.messages = [];
  }

  ngOnDestroy(): void {
    this.adminMessageService.subject.unsubscribe();
  }

  private timeoutConsoleMessage() {
    setTimeout(() => {
      if (this.clickCounter === 1) {
        this.clearMessages();
      }
      this.clickCounter--;
    }, 5000);
  }
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TodolistService} from "../todolist.service";
import {AdminMessageService} from "../../admin/common/service/admin-message.service";
import {Task} from "../model/task";

@Component({
  selector: 'app-updatetask',
  templateUrl: './updatetask.component.html',
  styleUrls: ['./updatetask.component.css']
})
export class UpdatetaskComponent implements OnInit {
  formGroup!: FormGroup;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private todolistService: TodolistService,
    private adminMessageService: AdminMessageService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      deadline: [null, [Validators.required]],
      shouldNotify: [false],
    });
    this.getTask();
  }

  submit() {
    let id = Number(this.route.snapshot.params['id']);

    this.todolistService.updateTask(id, {
      name: this.formGroup.get('name')?.value,
      deadline: this.formGroup.get('deadline')?.value,
      notify: this.formGroup.get('shouldNotify')?.value,
    } as Task).subscribe({
      next: task => {
        this.router.navigate(['/todolist'])
          .then(() => this.snackBar.open("Task added", "OK", {duration: 3000}))
      },
      error: err => {
        this.adminMessageService.addSpringErrors(err.error);
      }
    });
  }

  get name() {
    return this.formGroup.get('name');
  }

  get shouldNotify() {
    return this.formGroup.get('shouldNotify');
  }

  get deadline() {
    return this.formGroup.get('deadline');
  }

  onCancel() {
    this.router.navigate(['/todolist']);
  }

  private getTask() {
    let id = Number(this.route.snapshot.params['id']);
    this.todolistService.getTaskById(id).subscribe({
      next: task => {
        this.formGroup.setValue({
          name: task.name,
          deadline: task.deadline,
          shouldNotify: task.notify
        })
      },
      error: err => {
        this.adminMessageService.addSpringErrors(err.error);
      }
    });
  }
}

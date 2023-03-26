import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../common/model/page";
import {Task} from "./model/task";

@Injectable({
  providedIn: 'root'
})
export class TodolistService {

  constructor(private http: HttpClient) {
  }

  getTasks(page: number, size: number): Observable<Page<Task>> {
    return this.http.get<Page<Task>>(`https://planerbackend.dudios.pl/tasks?page=${page}&size=${size}`);
  }

  addNewTask(task: Task): Observable<Task> {
    return this.http.post<Task>('https://planerbackend.dudios.pl/task', task);
  }

  deleteTask(id: number) {
    return this.http.delete(`https://planerbackend.dudios.pl/task/${id}`);
  }

  updateTask(id: number, param2: Task): Observable<Task> {
    return this.http.put<Task>(`https://planerbackend.dudios.pl/task/${id}`, param2);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`https://planerbackend.dudios.pl/task/${id}`);
  }


  changeStatus(id: number, completed: boolean) {
    return this.http.patch(`https://planerbackend.dudios.pl/task/${id}?completed=${completed}`, null);
  }
}

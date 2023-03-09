export interface Task {
  id: number;
  name: string;
  deadline: Date;
  completed: boolean;
  notify: boolean;
  userId: number;

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
 private host = "http://localhost:5000/task";
  constructor(private httpClient:HttpClient) { }
  findAll(){
  return this.httpClient.get<Task[]>(this.host);
}
deleteTask(id: number | undefined){
 return this.httpClient.delete(`${this.host}/${id}`);
}
persist(task: Task) { 
  return this.httpClient.post<Task>(this.host,task);
}
compelted(id: number | undefined,completed : Boolean){
  return this.httpClient.patch(`${this.host}/${id}`,{completed : !completed});  
} 
update (task : Task){
  return this.httpClient.put(`${this.host}/${task.id}`,task);
}
}

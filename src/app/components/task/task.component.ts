import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
tasks : Task[] = [];
resultTasks : Task[] = [];
editForm : Boolean =false;
showForm : Boolean = false;
searshText : string = '';
myTask : Task = {
label : '',
completed : false
}
  constructor(private serviceTask : TaskService){

  }

  ngOnInit(): void {
    this.getTask();
    throw new Error('Method not implemented.');
  }
  getTask () {
    this.serviceTask.findAll().subscribe(task=> {
      this.resultTasks = this.tasks=task
    } )
  }
  supprimerTache(id: number | undefined){
    this.serviceTask.deleteTask(id).
    subscribe(()=>{
      this.tasks = this.tasks.filter(task=>task.id != id)
    })
  }
  persistTache(){
    this.serviceTask.persist(this.myTask).
    subscribe((task) => {
      this.tasks = [task,...this.tasks];
      this.resetTache();
      this.showForm=false;
    })
  }
  resetTache(){
    this.myTask = {
      label:'',
      completed : false
    }
      
  }
  toggelCompletd ( task:Task){
    this.serviceTask.compelted(task.id,task.completed)
    .subscribe(()=>{
      task.completed = !task.completed
    })
  }
  editTache(task : Task){
    this.myTask = task
    this.editForm =true;
  }
  updateTache(){
    this.serviceTask.update(this.myTask)
      .subscribe(task => {
        this.resetTache();
        this.editForm=false;
      })
  }
  rechercherTache(){
    this.resultTasks = this.tasks.filter((task)=> task.label.toLowerCase().includes(this.searshText.toLowerCase()))
  }
}

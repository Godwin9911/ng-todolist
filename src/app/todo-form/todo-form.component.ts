import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Uuid } from 'src/common/uuid.service';


@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  buttonStatus: string = 'Add';
  currentId: number;
  task: string;
  priority: string = 'low';
  filterBy: string = 'all';
  visibleTask: any = [];
  taskList: any = [
    {
      id:this.uuid.generateId(),
      task:'Complete Angular Tutorials',
      priority: 'low'
    },
    {
      id:this.uuid.generateId(),
      task:'Retake IQ Test',
      priority: 'medium'
    },
    {
      id:this.uuid.generateId(),
      task:'Complete Objectives',
      priority: 'high'
    }
  ];

  changedTasks: any [];
  constructor(private toastr: ToastrService,
              private uuid: Uuid ) { }

  ngOnInit() {
    this.visibleTask = this.taskList.slice(0);
  }

  filter(by){
    this.filterBy = by;
    if(this.filterBy === 'all'){
      this.visibleTask = this.taskList.slice(0);
    }else{
      this.visibleTask = this.taskList.filter(task => {
        return task.priority === this.filterBy;
      })
    }
  }

  onSubmit(form: NgForm){
    if(form.valid){
      if(this.buttonStatus === 'Add'){
        this.taskList.push({
          id: this.uuid.generateId(),
          task: this.task,
          priority: this.priority
        });
        this.toastr.success(`priority ${this.priority}`,'Task Added');
      }else{
        //update
        this.delete(this.currentId, false);
        this.taskList.push({
          id: this.currentId,
          task: this.task,
          priority: this.priority
        });
        this.toastr.success(`priority ${this.priority}`,'Task Updated');
        this.buttonStatus = 'Add'; 
      }
      form.resetForm();
    }
    this.filter(this.filterBy);
  }
   
  cancel(form: NgForm){
    this.buttonStatus = 'Add';
    form.resetForm();
  }

  delete(id, update=true): void {
    this.changedTasks = this.taskList.filter(task => task.id !== id);
    this.taskList = this.changedTasks;
    if(update){
      this.toastr.success('Task Deleted');
    }
    this.filter(this.filterBy);
  }

  update(list): void {
    this.task = list.task; 
    this.priority = list.priority; 
    this.currentId= list.id;
    this.buttonStatus = 'Update';
  }

}

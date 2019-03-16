import { Component, OnInit } from '@angular/core';
import { TaskserviceService } from '../taskservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskVO } from '../task';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-updatetask',
  templateUrl: './updatetask.component.html',
  styleUrls: ['./updatetask.component.css']
})
export class UpdatetaskComponent implements OnInit {
  task_id: number;
  task: string;
  priority: number;
  parentTask: string;
  startDate: string;
  endDate: string;
  aTask: TaskVO;
  updateTaskForm: FormGroup;

  constructor(private taskService: TaskserviceService, private route: ActivatedRoute, private router: Router) {
    this.initForm();
  }

  initForm() {
    this.updateTaskForm = new FormGroup({
      task: new FormControl(),
      priority: new FormControl(),
      parentTask: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl()
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.task_id = params['id'];
    });
    this.getTaskFromService();
    /*this.updateTaskForm.get("task").setValue(this.aTask.task);
    this.updateTaskForm.get("parentTask").setValue(this.aTask.parentTask);
    this.updateTaskForm.get("priority").setValue(this.aTask.priority);
    this.updateTaskForm.get("startDate").setValue(this.aTask.startDate);
    this.updateTaskForm.get("endDate").setValue(this.aTask.endDate);*/
  }

  getTaskFromService() {
    this.taskService.getTask(this.task_id).subscribe(data =>{
      console.log(data);
      this.aTask = data;
      console.log(this.aTask);
      this.updateTaskForm.get("task").setValue(this.aTask.task);
    this.updateTaskForm.get("parentTask").setValue(this.aTask.parentTask);
    this.updateTaskForm.get("priority").setValue(this.aTask.priority);
    this.updateTaskForm.get("startDate").setValue(this.aTask.startDate);
    this.updateTaskForm.get("endDate").setValue(this.aTask.endDate);
    });
    
  }

  onSubmit() {
    this.aTask.task = this.updateTaskForm.get("task").value;
    this.aTask.parentTask = this.updateTaskForm.get("parentTask").value;
    this.aTask.priority = this.updateTaskForm.get("priority").value;
    this.aTask.startDate = this.updateTaskForm.get("startDate").value;
    this.aTask.endDate = this.updateTaskForm.get("endDate").value;

   this.taskService.updateTask(this.task_id,this.aTask).subscribe(data => {console.log(data)
   this.router.navigateByUrl("");
   });

   
  }

  cancel() {
    this.router.navigateByUrl("");
  }

}

import { Component, OnInit } from '@angular/core';
import { TaskserviceService } from '../taskservice.service';
import { TaskVO } from '../task';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {
  tasks:Array<TaskVO> = [];
  taskSearch:string = "";
  parentTaskSearch:string = "";
  priorityFromSearch:number = 1;
  priorityToSearch:number = 30;
  startDateSearch:string = "1900-01-01";
  endDateSearch:string = "2990-12-31";

  constructor(public taskService: TaskserviceService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(){
    this.tasks = [];
    this.taskService.getTasks().subscribe((data) => {
      console.log(data);
      this.tasks = data;
    });
  }

  updateTask(id:number){
    this.router.navigateByUrl('updatetask/'+id);
  }

  endTask(endingTask:TaskVO, endingTaskID: number){
    endingTask.endDate = formatDate(new Date(), 'yyyy-MM-dd','en');
    this.taskService.updateTask(endingTaskID,endingTask).subscribe(data => console.log(data));
    this.router.navigateByUrl("");
  }

}

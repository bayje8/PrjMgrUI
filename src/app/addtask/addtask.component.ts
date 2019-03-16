import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TaskVO } from '../task';
import { TaskserviceService } from '../taskservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  addTaskForm: FormGroup;
  aTask = new TaskVO();

  constructor(private taskService: TaskserviceService, private route: ActivatedRoute, private router: Router) {
    this.initForm();
  }

  ngOnInit() {
  }

  initForm() {
    this.addTaskForm = new FormGroup({
      task: new FormControl(),
      priority: new FormControl(),
      parenttask: new FormControl(),
      startdate: new FormControl(),
    });
  }

  onSubmit() {
    console.log("submitted!")

    this.aTask.parentTask = this.addTaskForm.get("parenttask").value
    this.aTask.task = this.addTaskForm.get("task").value
    this.aTask.priority = this.addTaskForm.get("priority").value
    this.aTask.startDate = this.addTaskForm.get("startdate").value
    this.aTask.endDate = ""
    console.log(this.aTask);
    this.taskService.addTask(this.aTask).subscribe((err) => { console.log(err) 
      this.router.navigateByUrl("");
    });
    
  }

  reset() {
    this.initForm();
  }
}

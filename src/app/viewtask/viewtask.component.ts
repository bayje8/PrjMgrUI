import { Component, OnInit } from '@angular/core';
import { TaskserviceService } from '../taskservice.service';
import { TaskVO } from '../task';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { project } from '../project';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {
  tasks: Array<TaskVO> = [];
  taskSearch: string = "";
  parentTaskSearch: string = "";
  priorityFromSearch: number = 1;
  priorityToSearch: number = 30;
  startDateSearch: string = "1900-01-01";
  endDateSearch: string = "2990-12-31";
  projects: Array<project> = [];
  selectedProject: project = new project();
  projectSelectionString: string = "";
  projectName: string = "";
  searchStr:string = "";
  constructor(public taskService: TaskserviceService, private route: ActivatedRoute, private router: Router) {
    this.getProjects();
  }

  ngOnInit() {
  }

  getProjects() {
    this.projects = [];
    this.taskService.getProjects().subscribe((data) => {
      this.projects = data;
      console.log(data);
    });
  }

  selectProject(p: project) {
    this.selectedProject = p;
    this.projectName = p.project;
    this.projectSelectionString = this.projectName + " - selected. Please click the close button to exit";
    this.getTasks(this.selectedProject.project_id);
  }

  getTasks(project_id:number) {
    this.tasks = [];
    this.taskService.getTasks(project_id).subscribe((data) => {
      console.log(data);
      this.tasks = data;
    });
  }

  updateTask(id: number) {
    this.router.navigateByUrl('updatetask/' + id);
  }

  endTask(endingTask: TaskVO, endingTaskID: number) {
    endingTask.end_date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.taskService.updateTask(endingTaskID, endingTask).subscribe(data => console.log(data));
    this.router.navigateByUrl("");
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TaskserviceService } from '../taskservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { project } from '../project';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {
  addProjectForm: FormGroup;
  addflag: boolean = true;
  projects: Array<project> = [];
  validationMsg: boolean;
  aProject: project = new project();
  updatingProject: project = new project();
  constructor(private taskService: TaskserviceService, private route: ActivatedRoute, private router: Router) {
    this.initform();
    this.getProjects();
  }

  ngOnInit() {
  }

  initform() {
    this.addProjectForm = new FormGroup({
      iProject: new FormControl(),
      iStartDate: new FormControl(),
      iEndDate: new FormControl(),
      iPriority: new FormControl(),
      iManager: new FormControl()
    });
  }

  getProjects() {

  }

  onSubmit() {
    if (this.addflag) {
      this.addProject();
    } else {
      this.updateProject();
    }
  }

  addProject() {
this.aProject.project = this.addProjectForm.get("iProject").value;
this.aProject.startDate = this.addProjectForm.get("iStartDate").value;
this.aProject.endDate = this.addProjectForm.get("iEndDate").value;
this.aProject.priority = this.addProjectForm.get("iPriority").value;
this.aProject.project = this.addProjectForm.get("iManager").value;
  }

  updateProject() {

  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TaskVO } from '../task';
import { TaskserviceService } from '../taskservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { project } from '../project';
import { parenttask } from '../parenttask';
import { user } from '../user';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  addTaskForm: FormGroup;
  aTask = new TaskVO();
  projectName: string = "";
  searchStr: string = "";
  selectedProject: project = new project();
  projectSelectionStr: string = "";
  projects: Array<project> = [];
  parenttaskName: string = "";
  parenttaskSelectionStr: string = "";
  parenttasks: Array<parenttask> = [];
  selectedParentTask: parenttask = new parenttask();
  selectedUser: user = new user();
  users: Array<user> = [];
  userSelectionStr: string = "";
  userName: string = "";
  projectFlag: boolean = true;
  userFlag: boolean = false;
  parenttaskFlag: boolean = false;
  constructor(private taskService: TaskserviceService, private route: ActivatedRoute, private router: Router) {
    this.initForm();
    this.getProjects();
    this.getParentTasks();
    this.getUsers();
  }

  ngOnInit() {
  }

  triggerProjectModel() {
    this.projectFlag = true;
    this.userFlag = false;
    this.parenttaskFlag = false;
  }

  triggerParentTaskModel(){
    this.projectFlag = false;
    this.userFlag = false;
    this.parenttaskFlag = true;
  }

  triggerUserModal(){
    this.projectFlag = false;
    this.userFlag = true;
    this.parenttaskFlag = false;
  }
  
  initForm() {
    this.addTaskForm = new FormGroup({
      project: new FormControl(),
      task: new FormControl(),
      iParentTaskChkBx: new FormControl(),
      priority: new FormControl(),
      parenttask: new FormControl(),
      startdate: new FormControl(),
      enddate: new FormControl(),
      user: new FormControl()
    });
  }

  getProjects() {
    this.taskService.getProjects().subscribe((data) => { this.projects = data });
  }

  getParentTasks() {
    console.log("Calling get parent tasks...");
    this.taskService.getParentTasks().subscribe((data) => {
      this.parenttasks = data;
    });
    console.log("Fetched Parent Tasks are: " + this.parenttasks);
  }

  getUsers() {
    this.users = [];
    this.taskService.getUsers().subscribe((data) => {
      this.users = data;
      console.log(data);
    });
    console.log("Fetched users are: "+this.users)
  }

  onSubmit() {
    console.log("submitted!")

    this.aTask.parentTask = this.addTaskForm.get("parenttask").value
    this.aTask.task = this.addTaskForm.get("task").value
    this.aTask.priority = this.addTaskForm.get("priority").value
    this.aTask.startDate = this.addTaskForm.get("startdate").value
    this.aTask.endDate = ""
    console.log(this.aTask);
    this.taskService.addTask(this.aTask).subscribe((err) => {
      console.log(err)
      this.router.navigateByUrl("");
    });

  }

  reset() {
    this.initForm();
  }

  altParentTaskFields() {
    let element = <HTMLInputElement>document.getElementById("iParentTaskChkBx");
    if (element.checked == false) {
      this.addTaskForm.get("priority").enable();
      this.addTaskForm.get("parenttask").enable();
      this.addTaskForm.get("startdate").enable();
      this.addTaskForm.get("enddate").enable();
      this.addTaskForm.get("user").enable();
      let currentDate = new Date();
      this.addTaskForm.get("startdate").setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
      currentDate.setDate(currentDate.getDate() + parseInt("1"));
      this.addTaskForm.get("enddate").setValue(formatDate(currentDate, 'yyyy-MM-dd', 'en'));
    } else {
      this.addTaskForm.get("priority").disable();
      this.addTaskForm.get("parenttask").disable();
      this.addTaskForm.get("startdate").disable();
      this.addTaskForm.get("enddate").disable();
      this.addTaskForm.get("user").disable();
      this.addTaskForm.get("priority").setValue("");
      this.addTaskForm.get("parenttask").setValue("");
      this.addTaskForm.get("startdate").setValue("");
      this.addTaskForm.get("enddate").setValue("");
      this.addTaskForm.get("user").setValue("");
    }
  }

  selectProject(p: project) {
    this.selectedProject = p;
    this.projectName = p.project;
    this.projectSelectionStr = this.projectName + " - is selected. Please click the close button to exit!";
  }

  selectParentTask(pt: parenttask) {
    this.selectedParentTask = pt;
    this.parenttaskName = pt.parent_task;
    this.parenttaskSelectionStr = this.parenttaskName + " - is selected. Please click the close button to exit!";
  }

  selectUser(u: user) {
    this.selectedUser = u;
    this.userName = u.firstName + " , " + u.lastName;
    this.userSelectionStr = this.userName + " - is selected. Please click the close button to exit!";
  }
}

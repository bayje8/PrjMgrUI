import { Component, OnInit } from '@angular/core';
import { TaskserviceService } from '../taskservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { user } from '../user';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  addUserForm: FormGroup;
  aUser = new user();
  searchStr: String = "search...";
  users: Array<user> = [];

  constructor(private taskService: TaskserviceService, private route: ActivatedRoute, private router: Router) {
    this.initform();
    this.getUsers();
  }

  ngOnInit() {
  }

  initform() {
    this.addUserForm = new FormGroup({
      ifirstname: new FormControl(),
      ilastname: new FormControl(),
      iemployeeid: new FormControl(),
    });
  }

  onSubmit() {
    console.log("Add User Form submitted!")
    console.log(this.addUserForm.get("ifirstname").value)
    this.aUser.firstName = this.addUserForm.get("ifirstname").value
    this.aUser.lastName = this.addUserForm.get("ilastname").value
    this.aUser.employeeId = this.addUserForm.get("iemployeeid").value
    console.log(this.aUser);
    this.taskService.addUser(this.aUser).subscribe((data) => {
      console.log("Added user");
    }, (err) => {
      console.log(err);
    });
  }

  reset() {
    this.initform();
  }

  updateTask() {

  }

  deleteTask() {

  }

  getUsers() {
    console.log("Calling get Users...")
    this.users = [];
    this.taskService.getUsers().subscribe((data) => {
      this.users = data;
      console.log(data);
    });
  }
}

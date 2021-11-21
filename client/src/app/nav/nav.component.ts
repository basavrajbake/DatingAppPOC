import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  currentUser: string;
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    //this.getCurrentUser();
    this.currentUser = JSON.parse(localStorage.getItem("user"))?.userName;
  }
  login() {
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
      this.currentUser = JSON.parse(localStorage.getItem("user")).userName;
    }, error => console.log(error));
  }
  logout() {
    this.accountService.logout();
    this.currentUser = null;
  }
  getCurrentUser() {
    this.accountService.currentUser$.subscribe(user => {
      this.currentUser = user.userName;
    }, error => {
      console.log(error);
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
 // currentUser: string;
  constructor(public accountService: AccountService, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    //this.getCurrentUser();
    //this.currentUser = JSON.parse(localStorage.getItem("user"))?.userName;
  }
  login() {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/members');
      //this.currentUser = JSON.parse(localStorage.getItem("user")).userName;
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    });
  }
  logout() {
    this.accountService.logout();
    //this.currentUser = null;
    this.router.navigateByUrl('/');
  }
  getCurrentUser() {
    this.accountService.currentUser$.subscribe(user => {
      //this.currentUser = user.userName;
    }, error => {
      console.log(error);
    })
  }

}

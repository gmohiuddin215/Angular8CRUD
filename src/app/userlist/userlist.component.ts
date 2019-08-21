import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  private users: any;
  filteredusers = [];
  searchText: string;
  error: any;

  constructor(private userservice: UserService) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.userservice.getUserList().subscribe( res => {
      this.users = res;
      this.filteredusers = this.users;
    });
  }

}

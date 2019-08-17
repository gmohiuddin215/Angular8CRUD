import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  users: User[];
  filteredusers: User[];

  // private $search: string;

  // get searchTerm(): string {
  //   return this.$search;
  // }
  // set searchTerm(value: string) {
  //   this.$search = value;
  // }

  filterUsers(searchString: string) {
    // return this.users.filter(user =>
    //   user.fname.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);

    this.userservice.getUser(+searchString).subscribe( data => {
      this.filteredusers = data;
    });
  }

  constructor(private userservice: UserService) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.userservice.getUserList().subscribe( data => {
      this.users = data;
      this.filteredusers = this.users;
    });
  }

  // searchUser(search: string) {
  //   this.id =  +search;
  //   this.userservice.getUser(this.id).subscribe(data => {
  //     this.user = data;
  //   });
  // }

}

import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { ConcatSource } from 'webpack-sources';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  user: User = new User();
  submitted = false;

  constructor(private userservice: UserService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  newUser(): void {
    this.submitted = false;
    this.user = new User();
  }

  save() {
    this.userservice.addUser(this.user)
    .subscribe(
      data => {
        console.log(data);
        this.submitted = true; },
         error => console.log(error));
    this.user = new User();
  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  onSubmit() {
    this.save();
  }


}

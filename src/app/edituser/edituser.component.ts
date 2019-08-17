import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { UserService } from '../user.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  $user: User = new User();
  userdetails: Observable<User>;
  id: number;
  constructor( private ar: ActivatedRoute, private router: Router, private us: UserService) { }

  ngOnInit() {
    this.userdetails = this.ar.paramMap.pipe(
      switchMap( (params: ParamMap) =>
      this.userdetails = this.us.getUser(+params.get('id')
      ))
    );

    this.ar.paramMap.subscribe(data =>
        this.id = +data.get('id'));

  }

  update() {
    this.$user = new User();
    this.us.updateUser(this.id, this.$user)
    .subscribe(
      data => {
        console.log(data);
      },
      error => console.log(error));
  }

  deleteUser() {
    this.us.deleteUser(this.id)
    .subscribe(
      data => {
        console.log(data);
      },
      error => console.error(error));
  }

  onSubmit() {
    this.update();
  }


}

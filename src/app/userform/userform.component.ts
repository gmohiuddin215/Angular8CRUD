import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {

  pageTitle: string;
  error: string;
  uploadError: string;
  efbtn = false;
  deleteid: number;
  userform: FormGroup;

  user: any = {};

  constructor(private fb: FormBuilder, private us: UserService, private router: Router, private ar: ActivatedRoute) { }

  ngOnInit() {
    const id = this.ar.snapshot.paramMap.get('id');
    this.deleteid = +this.ar.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit User';
      this.efbtn = true;
      this.us.getUser(+id).subscribe(
        (res: {}) => {
          this.user = res;
          this.userform.patchValue({
            fname: this.user.fname,
            lname: this.user.lname,
            dob: this.user.dob,
            email: this.user.email,
            address: this.user.address,
            id: this.user.id
          });
        }
      );
    } else {
      this.pageTitle = 'Add User';
    }

    this.userform = this.fb.group({
      id: [''],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  onSubmit() {

    const id = this.userform.get('id').value;

    if (id) {
      this.us.updateUser(+id, this.user).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/users']);
          }
        },
        error => this.error = error
      );
    } else {
      this.us.addUser(this.user).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/users']);
          }
        },
        error => this.error = error
      );
    }
  }

  onDelete() {
    if (confirm('Are you sure want to delete record with ID = ' + this.deleteid)) {
      this.us.deleteUser(this.deleteid).subscribe(
        res => {
          console.log(res);
        },
        error => this.error = error
      );
    }
    this.router.navigate(['/users']);
  }

}

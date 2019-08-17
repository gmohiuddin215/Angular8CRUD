import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserlistComponent } from '../userlist/userlist.component';
import { AdduserComponent } from '../adduser/adduser.component';
import { EdituserComponent } from '../edituser/edituser.component';
import { UserResolver } from '../userresolver.service';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UserlistComponent },
  { path: 'adduser', component: AdduserComponent},
  { path: 'edituser/:id', component: EdituserComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

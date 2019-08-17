import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from './user';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable()
export class UserResolver implements Resolve<User> {
    // tslint:disable-next-line: variable-name
    _id: number;
    constructor( private us: UserService, private router: Router) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<User> {
        const id = route.paramMap.get('id');
        this._id = Number(id);
        return this.us.getUser(this._id).pipe (
            take(1),
            map(user => {
                if (user) {
                    return user;
                } else {
                    console.error('Id not Found!');
                }
            })
        );
    }

}
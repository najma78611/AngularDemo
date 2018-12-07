import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
@Injectable()
export class AuthGuardService implements CanActivate {
	login_status:any = null;
  constructor( public router: Router) {}
  canActivate(): boolean {
		this.login_status = window.sessionStorage.getItem('login_status');
    if (this.login_status !== null) {
			return true;
	  }	
		this.router.navigate(['/login']);
		return false;
  }

}
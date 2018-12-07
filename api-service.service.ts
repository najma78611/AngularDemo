
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { GlobalVariables } from './global-variables';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Injectable({
  providedIn: 'root'
})

export class ApiServiceService {
  public data: any;
  constructor(public http: HttpClient, private _router: Router, private spinner: NgxSpinnerService) { }
  
  signup(signupParams) {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }
    
    // don't have the data yet

    return new Promise(resolve => {
      var endpoint = new GlobalVariables().API_URL + "users/create";
      let user = {user: signupParams};
      this.http.post(endpoint, user)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
          this.spinner.hide();
          Swal({
            title: 'Thank You',
            text: 'You are registered successfully.',
            type: 'success',
            timer : 2000
          }).then((result) => {
            this._router.navigate(['login']);
          });
        }
        );
    });

  }

  login(postParams) {
    this.spinner.show();
    return new Promise(resolve => {
      var endpoint = new GlobalVariables().API_URL + "user_token";
      let loginparam = {auth: postParams};
      this.http.post(endpoint, loginparam)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        },
        err =>{
          if(err.status == 404 ){
            this.spinner.hide();
            Swal({
              text: 'Please check email or password.',
              type: 'error',
              timer: 5000
            })
          }
          else{
            this.spinner.hide();
            Swal({
              text: 'Server is not responding.',
              type: 'error',
              timer: 5000
            })
          }
        }
      );
    });
  }
  comment(commentparams) {
    return new Promise(resolve => {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': window.sessionStorage.getItem('auth_token') });
      var endpointuser = new GlobalVariables().API_URL + "comment_participant";
      let comment = { comment: commentparams };
      this.http.post(endpointuser, comment, { headers: headers })
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
          if(data['status']==200){
            this.spinner.hide();
            Swal({
              text: data['msg'],
              type: 'success',
              timer: 2000
            });
          }
          else if (data['status'] == 202) {
            this.spinner.hide();
            Swal({
              text: data['msg'],
              type: 'warning',
              timer: 2000
            });
          }
        },
        err => {
          this.spinner.hide();
          console.log(err);
        });
    });
  }

  like(likeparams) {
    return new Promise(resolve => {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': window.sessionStorage.getItem('auth_token') });
      var endpointuser = new GlobalVariables().API_URL + "participants/like_participant";
      this.http.post(endpointuser, likeparams, { headers: headers })
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
          Swal({
            text: data['msg'],
            type: 'success',
            timer: 2000
          })
        });

    });
  }

  contests() {
    return new Promise(resolve => {
      var endpointcontests = new GlobalVariables().API_URL + "competitions";
      this.http.get(endpointcontests)
      .subscribe(data => {
        this.data = data;
        resolve(this.data); 
        }
      );
    })
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ApiServiceService } from '../../api-service.service';
import { ActivatedRoute, Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedinLoginProvider
} from 'angular-6-social-login';
import { GlobalVariables } from '../../global-variables';
import { NgxSpinnerService } from 'ngx-spinner';
import {Location} from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()],

})
export class LoginComponent implements OnInit {
  data: any;
  public login: any;
  public myform: any;
  public email: any;
  public password: any;
  signup_data: any;
  login_status: any;
  user_status_link: any;
  @Input() headerComp: HeaderComponent;

  constructor(private route: ActivatedRoute, private _router: Router, public apiService: ApiServiceService, private http: HttpClient, private socialAuthService: AuthService, private spinner: NgxSpinnerService, private location : Location) {}

  ngOnInit() {
    this.login_status = window.sessionStorage.getItem('login_status');
    if(this.login_status !== null){
      Swal({
        text: 'You are already logged-in.',
        timer : 2000  
      }).then((result) => {
        this.location.back();
      });
    }
  }
  

  loginRequest(e) {
    this.user_status_link = window.sessionStorage.getItem('user_status_link');
    console.log(e);
    let postParams = {
      email: e.target.elements[0].value,
      password: e.target.elements[1].value
    }

    this.apiService.login(postParams)
      .then(data => {
        this.login = data
        console.log(data['jwt']);
        var endpointauth = new GlobalVariables().API_URL + "auth";
        console.log("success login", this.login);
        if(data['jwt']){
          const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': data['jwt']});
          this.http.get(endpointauth, { headers: headers })
          .subscribe(data =>
            {  
              this.data = data;
              window.sessionStorage.setItem('current_user_id', data['current_user_id']);
              console.log(this.data);            
              this.spinner.hide();
              Swal({
                title: 'Thank You',
                text: 'You are logged in successfully.',
                type: 'success',
                timer : 2000  
              }).then((result) => {
                if(this.data['role'] === 'admin'){
                  console.log("admin");
                  this._router.navigate(['admin']);
                }
                else if(this.user_status_link == 'true'){
                  //this._router.navigate(['/participant']);
                  window.location.href = "/participant";
                } 
                else{                 
                  //this._router.navigate(['user-profile']);
                  //this.headerComp.refreshFromParent();
                  window.location.href = "/user-profile";     
                }
              });
            }
          );
          window.sessionStorage.setItem('auth_token', data['jwt']);
          window.sessionStorage.setItem('login_status', 'loggedin');
          localStorage.setItem('isLoggedin', 'true');
        }
      },
      err => {
        console.log("Error occured.")
      });
  }
  
  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
      console.log("face");
    } 
    else if (socialPlatform == "linkedin") {
      socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    }
    else if (socialPlatform == "google") {
      console.log('google');
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(
    (userData) => {
      console.log(socialPlatform + " sign in data : ", userData);
      console.log(userData['email']);
      let signupParams = {
        email : userData['email'],
        first_name: userData['name'],
        password: '123456789'
      }
      var endpoint = new GlobalVariables().API_URL + "users/create";
      let user = { user: signupParams };
      this.http.post(endpoint, user)
        .subscribe(data => {
          this.data = data;
          this.signup_data = data
          console.log("success", this.signup_data);
          if(data['status'] == 200){ 
            this.spinner.hide();
            Swal({
              title: 'Thank You',
              text: data['msg'],
              type: 'success',
              timer: 2000
            })
          let postParams = {
            email: userData['email'],
            password: '123456789'
          }
          this.apiService.login(postParams)
            .then(data => {
              this.login = data
              var endpointauth = new GlobalVariables().API_URL + "auth";
              if (data['jwt']) {
                const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': data['jwt'] });
                this.http.get(endpointauth, { headers: headers })
                .subscribe(data => {
                  this.data = data;
                  console.log(this.data);
                  this.spinner.hide();
                  Swal({
                    title: 'Thank You',
                    text: 'You are logged in successfully.',
                    type: 'success',
                    timer: 2000
                  }).then((result) => {
                    if (this.data['role'] === 'admin') {
                      this._router.navigate(['admin']);
                    } else {
                      //this._router.navigate(['user-profile']);
                      window.location.href = "/user-profile";
                    }
                  });
                }
                );
                window.sessionStorage.setItem('auth_token', data['jwt']);
                window.sessionStorage.setItem('login_status', 'loggedin');
              }
            },
              err => {
                console.log("Error occured.")
              });
            }
          },
          err => {
            console.log("Error occured.")
          });
        }
    );
  }
}

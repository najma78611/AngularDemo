import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ApiServiceService } from '../../api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    public signup: any;
    constructor(public apiService: ApiServiceService, private spinner: NgxSpinnerService) {}

    ngOnInit() {
    }

    signupRequest(e) {
      this.spinner.show();
      let signupParams = {
        email: e.target.elements[0].value,
        country: e.target.elements[1].value,
        state: e.target.elements[2].value,
        city: e.target.elements[3].value,
        country_code: e.target.elements[4].value,
        mobile_no: e.target.elements[5].value,
        password: e.target.elements[6].value
      }
      this.apiService.signup(signupParams)
      .then(data => {
        this.spinner.hide();
        this.signup = data;
        console.log("success", this.signup);
      },
      err => {
        this.spinner.hide();
        console.log("Error occured.")
      });
    }

}

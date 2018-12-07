import { Component, OnInit } from '@angular/core';
declare var $;
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PayPalConfig } from 'ngx-paypal';
import { GlobalVariables } from '../../global-variables';
declare let paypal: any;
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-participant-form',
  templateUrl: './participant-form.component.html',
  styleUrls: ['./participant-form.component.scss']
})

export class ParticipantFormComponent implements OnInit {
  _user_img_size: 2000000000;
  _user_img_type_error: any;
  _user_img_error: boolean;
  _user_img_size_error: any;
  _user_img_type: any = ['image/jpeg', 'image/png'];
  _file: any;
  _user_img: any;
  competition_name: any;
  participant_image: any = { 'size': '', 'type': '', 'file': '', 'fileName': '' };
  data : any;
  public payPalConfig?: PayPalConfig;
  payment: any;
  payment_status: boolean = false;
  constructor(private http: HttpClient, private _router: Router, private location: Location, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.competition_name = window.sessionStorage.getItem('competition_name');
    if(this.competition_name == null){
      this._router.navigate(['/competitions']);
    }
  }

  onFileChange(event) {
    this._file = event.target.files;
    const reader = new FileReader();
    const file: File = event.target.files;
    this.participant_image['size'] = file[0].size;
    this.participant_image['type'] = file[0].type;
    this.participant_image['fileName'] = file[0].name;
    this._user_img = file[0].name; 
    if (this._user_img_type.indexOf(file[0].type) < 0) {
      this._user_img_size_error = null;
      this._user_img_error = true;
      this._user_img_type_error = 'Image type does not matched.';
      $('#faclt_new_faculty').attr('disabled', true);
    } else if (this._user_img_size <= file[0].size) {
      this._user_img_type_error = null;
      this._user_img_error = true;
      this._user_img_size_error = 'Image size does not matched.';
      $('#faclt_new_faculty').attr('disabled', true);
    } else {
      this.participant_image = { 'size': '', 'type': '', 'file': '', 'fileName': '' };
      this._user_img_type_error = null;
      this._user_img_size_error = null;
      this.participant_image['size'] = file[0].size;
      this.participant_image['type'] = file[0].type;
      this.participant_image['fileName'] = file[0].name;
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        this.participant_image['file'] = reader.result;
      };
      this._user_img_error = false;
    }
  }
  
  participantRequest(event) {
    this.spinner.show();
    if (this.payment_status == true){
      let participantparams = {
        caption: event.target.elements[2].value,
        description: event.target.elements[1].value,
        participant_image: this.participant_image,
        contest_id: window.sessionStorage.getItem('competition_id'),
        payment: this.payment
      }
      console.log(participantparams);
      const headersupdate = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': window.sessionStorage.getItem('auth_token') });
        var endpointuser = new GlobalVariables().API_URL + "participants/create";
        this.http.post(endpointuser, participantparams, { headers: headersupdate })
        .subscribe(data => {
          this.data = data;
          console.log(this.data['msg']);
          this.spinner.hide();
          Swal({
            text: this.data['msg'],
            type: 'success',
            timer: 2000
          }).then((result) => {
            this._router.navigate(['user-profile']);
          });
          }
        );
      }
      else{
        this.spinner.hide();
        Swal({
          text: 'Payment not completed',
          type: 'error',
          timer: 2000
        })
      }
  }

  addScript: boolean = false;
  paypalLoad: boolean = true;

  finalAmount: number = 1;
 
  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
      production: '<your-production-key here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: 1, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment is successful.
        console.log(payment);
        console.log("Payment done succesfully");
        this.payment = {
          transaction_id : payment['id'],
          sale_id : payment["transactions"][0]["related_resources"][0]['sale']['id'],
          amount: payment["transactions"][0]['amount']['total']
        }
        Swal({
          text: 'Payment done successfully',
          type: 'success',
          timer: 2000
        })
        this.payment_status = true;
        console.log(this.payment);
      })
    }
  };

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }
  goBack(): void {
    this.location.back();
  }
}

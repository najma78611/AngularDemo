import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiServiceService } from '../../api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import {FormGroup} from "@angular/forms";
import {Location} from '@angular/common';
import { GlobalVariables } from '../../global-variables';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $;

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent implements OnInit {


  data: any;
  //public user:Array = [];
  public user: any = null;
  form: FormGroup;
  /** Link text */
  @Input() text = 'Upload';
  /** Name used in form which will be sent in HTTP request. */
  @Input() param = 'file';
  /** Target URL for file uploading. */
  @Input() target = 'https://file.io';
  /** File extension that accepted, same as 'accept' of <input type="file" />. 
  By the default, it's set to 'image/*'. */
  @Input() accept = 'image/*';
  /** Allow you to add handler after its completion. Bubble up response text from remote. */
  @Output() complete = new EventEmitter<string>();
  // private files: Array<FileUploadModel> = [];

  @ViewChild('fileInput') fileInput: ElementRef;

  selectedFile: File;

  _user_img_size: 2000000000;
  _user_img_type_error: any;
  _user_img_error: boolean;
  _cover_img_size_error: any;
  _cover_img_type_error: any;
  _user_img_size_error: any;
  _user_img_type: any = ['image/jpeg', 'image/png'];
  _file: any;
  _file2: any;
  _user_img: any;
  user_image: any = { 'size': '', 'type': '', 'file': '', 'fileName': '' };
  _cover_user_img: any;
  cover_user_image: any = { 'size': '', 'type': '', 'file': '', 'fileName': '' };

  constructor(private http : HttpClient, private _router : Router, private apiService : ApiServiceService, private location : Location, private spinner: NgxSpinnerService) {
    
  }

  ngOnInit() {
    this.spinner.show();
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': window.sessionStorage.getItem('auth_token')});
    var endpointcurrentuser = new GlobalVariables().API_URL + "users/current";
    this.http.get(endpointcurrentuser, { headers: headers })
    .subscribe(data =>
      {
        this.data = data;
        console.log(this.data);
        this.user = this.data['current_user'];
        console.log(this.user);
        this.spinner.hide();
      }
    );
  }
 
  onFileChange(event) {
    this._file = event.target.files;
    const reader = new FileReader();
    const file: File = event.target.files;
    this.user_image['size'] = file[0].size;
    this.user_image['type'] = file[0].type;
    this.user_image['fileName'] = file[0].name;
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
      this.user_image = { 'size': '', 'type': '', 'file': '', 'fileName': '' };
      this._user_img_type_error = null;
      this._user_img_size_error = null;
      this.user_image['size'] = file[0].size;
      this.user_image['type'] = file[0].type;
      this.user_image['fileName'] = file[0].name;
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        this.user_image['file'] = reader.result;
      };
      this._user_img_error = false;
    }
  }
  onFileChange2(event) {
    this._file2 = event.target.files;
    const reader2 = new FileReader();
    const file2: File = event.target.files;
    this.cover_user_image['size'] = file2[0].size;
    this.cover_user_image['type'] = file2[0].type;
    this.cover_user_image['fileName'] = file2[0].name;
    this._cover_user_img = file2[0].name;
    if (this._user_img_type.indexOf(file2[0].type) < 0) {
      this._cover_img_size_error = null;
      this._user_img_error = true;
      this._cover_img_type_error = 'Image type does not matched.';
      $('#faclt_new_faculty').attr('disabled', true);
    } else if (this._user_img_size <= file2[0].size) {
      this._cover_img_type_error = null;
      this._user_img_error = true;
      this._cover_img_size_error = 'Image size does not matched.';
      $('#faclt_new_faculty').attr('disabled', true);
    } else {
      this.cover_user_image = { 'size': '', 'type': '', 'file': '', 'fileName': '' };
      this._cover_img_type_error = null;
      this._cover_img_size_error = null;
      this.cover_user_image['size'] = file2[0].size;
      this.cover_user_image['type'] = file2[0].type;
      this.cover_user_image['fileName'] = file2[0].name;
      reader2.readAsDataURL(file2[0]);
      reader2.onload = () => {
        this.cover_user_image['file'] = reader2.result;
      };
      this._user_img_error = false;
    }
  }

  editProfileRequest(e) {
    this.spinner.show();
    let profileparams = {
      first_name: e.target.elements[0].value,
      last_name: e.target.elements[1].value,
      email: e.target.elements[2].value,
      country: e.target.elements[3].value,
      state: e.target.elements[4].value,
      city: e.target.elements[5].value,
      country_code: e.target.elements[6].value,
      mobile_no: e.target.elements[7].value,
      about_us: e.target.elements[8].value,
      profile_image: this.user_image,
      cover_image: this.cover_user_image
      
    }
    console.log(profileparams);
    console.log(profileparams);
    let user = {user: profileparams};
    if(this.data){
      const headersupdate = new HttpHeaders({'Content-Type': 'application/json','Authorization': window.sessionStorage.getItem('auth_token')});
      var endpointuser = new GlobalVariables().API_URL + "user/" + this.data['current_user']['id'];
      this.http.put(endpointuser, profileparams , { headers: headersupdate })
      .subscribe(data =>
        {
          this.data = data;
          console.log(this.data);
          this.spinner.hide();
          Swal({
            text: 'Profile update successfully.',
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
        title: '',
        text: 'Cannot Update Profile.',
        type: 'error',
        timer : 2000
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

}


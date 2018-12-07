import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalVariables } from '../../global-variables';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiServiceService } from '../../api-service.service';
declare var $: any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  data: any;
  first_name: any;
  public user: any = null;
  public profile_image: any;
  public cover_image: any;
  isImageLoading: boolean;
  participant_image: any;
  public profileImagesUrl= [] ;
  image_url = new GlobalVariables().Image_URL ;
  all_users: any;
  categories: any;
  upcoming_contests: any;
  isUpContest: boolean;
  profile_id: any;
  edit_profile_status: boolean = false;
  participant_id: any;
  login_status: any = null;
  like_status: boolean = false;
  like_data: any;
  current_user_id: any;
  other_users= [];
  likes: any;
  comments: any;
  competition_count: any;
  aboutUsStatus: boolean = false;
  about_us: any;
  constructor(private route: ActivatedRoute, private _router: Router, private http: HttpClient, private spinner: NgxSpinnerService, public apiService: ApiServiceService) { }

  ngOnInit() {

    this.isImageLoading = false;
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': window.sessionStorage.getItem('auth_token')});
    this.spinner.show();
    this.login_status = window.sessionStorage.getItem('login_status');

    this.profile_id = this.route.snapshot.params['id'];
    if (this.profile_id) {
      this.check_user(this.profile_id);
    }
    else{
      var endpointcurrentuser = new GlobalVariables().API_URL + "users/current";
      console.log("show");
      this.http.get(endpointcurrentuser, { headers: headers })
      .subscribe(data =>
        {
          this.data = data;
          if (this.data['status']== 200){
            this.user = data['current_user'];
            this.first_name = data['current_user']['first_name'];
            window.sessionStorage.setItem('user_name', this.first_name);    
            this.apply_data(this.data, this.user);
            this.edit_profile_status = true;
          }
          //   if(this.all_users[i][0] !== this.data['current_user']['id'])        
        }
      );
    }
    
    this.spinner.hide();

    this.apiService.contests()
    .then(data => {
      this.data = data;
      this.upcoming_contests = data['upcoming_competitions'];
      this.categories = data['category'];
      if(data['upcoming_competitions']== ''){
        this.isUpContest = true;
      }
    },
    err => {
      console.log(err);
    });

    this.current_user_id = window.sessionStorage.getItem('current_user_id');
    var endpointuser = new GlobalVariables().API_URL + "participants/user_liked_participant/" + this.current_user_id;
    this.http.get(endpointuser, { headers: headers })
    .subscribe(data => {
      this.like_data = data['like_count'];
      console.log(this.like_data);
      var arrayLength = this.like_data.length;
      for (var i = 0; i < arrayLength; i++) {
        console.log("#" + this.like_data[i]);
        $("#" + this.like_data[i]).addClass("like_color");
      }
    });

  }

  check_user(id){
    this.spinner.show();
    console.log(id);
    var endpointuser = new GlobalVariables().API_URL + "user_profile/" + id;
    this.http.get(endpointuser)
    .subscribe(data => {
      this.data = data;
      if (this.data['status']== 200){
        this.user = this.data['selected_user'];
        this.first_name = this.data['selected_user']['first_name'];
        this.apply_data(this.data, this.user);
      }
    }
    );
    this.spinner.hide();
  }

  apply_data(data, user){
    this.aboutUsStatus = false;
    console.log(user.about_us);
    this.about_us = user.about_us;
    if(user.about_us == '') {
      this.aboutUsStatus = true;
      console.log(this.aboutUsStatus);
    }
    this.participant_image = this.data['participant_images'];
    this.all_users = this.data['userImage'];
    var arrayLength = this.all_users.length;
    this.other_users = [];
    for (var i = 0; i < arrayLength; i++) {
      if(this.all_users[i][0] != window.sessionStorage.getItem('current_user_id')){
        this.other_users.push(this.all_users[i]);
      }
    }
    this.likes = data['like_count'];
    this.comments = data['comment_count'];
    this.competition_count= data['competition_count'];
    if(data['profile_image'] == null){
      this.isImageLoading = true;
      console.log("NO image");
    }
    else{
      this.profile_image = new GlobalVariables().Image_URL+ data['profile_image'];
      console.log("Image Found");
    }
    if(this.data['cover_image'] == null){
      this.isImageLoading = true;
      console.log("NO image");
    }
    else{
      this.cover_image = new GlobalVariables().Image_URL+ data['cover_image'];
      console.log("Image Found");
    }
  }

  commentModal(event,participant_id){
    console.log(event);
    if (this.login_status == null){
      Swal({
        text: 'Please login.',
        type: 'warning'
      });
    }
    else{
      this.participant_id = participant_id;
      $("#user-profile"+participant_id).modal('show');
    }
  }

  commentRequest(e){
    this.spinner.show();
    let commentparams = {
      description: e.target.elements[0].value,
      participant_id: e.target.elements[1].value
    }
    this.apiService.comment(commentparams)
    .then(data => {
      this.spinner.hide();
      this.data = data;
    },
    err => {
      this.spinner.hide();
      console.log(err);
    });
    $("#user-profile").modal('hide');
  }

  likeRequest(participant, event){
    this.spinner.show();
    if (this.login_status == null){
      this.spinner.hide();
      Swal({
        text: 'Please login.',
        type: 'warning'
      });
    }
    else{
      console.log(this.login_status);
      let likeparams = {
      participant_id: participant
      }
      this.apiService.like(likeparams)
      .then(data => {
        this.data = data;
        if(data){
          this.spinner.hide();
          $(event.target).css("color", "red");
        }
      },
      err => {
        this.spinner.hide();
        console.log(err);
      });
    }
  }

}

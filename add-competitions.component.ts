import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import { GlobalVariables } from '../../global-variables';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $;
@Component({
  selector: 'app-add-competitions',
  templateUrl: './add-competitions.component.html',
  styleUrls: ['./add-competitions.component.scss']
})
export class AddCompetitionsComponent implements OnInit {
  data: any;
  isPrizesPresent: boolean;
  contestPrizes = new Array<number>(3);
  allPrizes: any;
  allCategories: any;
  isCategoriesPresent: boolean;
  public contest: any = null;
  category: any;
  point: any;
  prize: any; 
  contest_id: any;
  is_publish: boolean;
  isPublish: boolean = true;
  start_date: any;
  end_date: any;
  prizes_rank: Array<any> = [];
  public today: any = null;
  start_date_get:any;
  marked = false;
  model: any;

  constructor(private route: ActivatedRoute, private _router: Router, private http: HttpClient, private location: Location, private datePipe: DatePipe, private spinner: NgxSpinnerService ) { }
   
  ngOnInit() {
    this.spinner.show();
    const currentDate:Date = new Date();
    let dd:any = currentDate.getDate()+1;
    let mm:any = currentDate.getMonth()+1;
    let yyyy:any = currentDate.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    this.today = yyyy + '-' + mm + '-' + dd;

    this.isPrizesPresent = false;
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': window.sessionStorage.getItem('auth_token')});
    var endpointprizes = new GlobalVariables().API_URL + "prizes";
    this.http.get(endpointprizes, { headers: headers })
    .subscribe(
      data =>
      {
        this.data = data;
        console.log(this.data);
        if(this.data){
          this.isPrizesPresent = true;
          console.log("Prizes available");
          this.allPrizes = this.data['prize'];
          console.log(this.allPrizes);
        }  
      }
    );

    this.isCategoriesPresent = false;
    var endpointcategories = new GlobalVariables().API_URL + "categories";
    this.http.get(endpointcategories, { headers: headers })
    .subscribe(
      data =>
      {
        this.data = data;
        console.log(this.data);
        if(this.data){
          this.isCategoriesPresent = true;
          console.log("Categories available");
          this.allCategories = this.data['category'];
          console.log(this.allCategories);
        }  
      }
    );

    this.contest_id = this.route.snapshot.params['id'];
      if (this.contest_id) {
        const headersedit = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': window.sessionStorage.getItem('auth_token') });
        var endpointuser = new GlobalVariables().API_URL + "contests/" + this.contest_id;
        this.http.get(endpointuser, { headers: headersedit })
          .subscribe(data => {
            this.data = data;
            if (this.data['status']== 200){
              this.contest = data['competition'];
              console.log(this.contest['category_id']);
              this.category = data['category'];
              this.prizes_rank = [data['prizes'][0],data['prizes'][1],data['prizes'][2]];
              this.prize = data['prizes'];
              console.log(this.prize);
              console.log(786);
              this.point = data['point'];
              //this.start_date = data['competition']['start_date'];
              //this.end_date =  data['competition']['end_date'];
              this.start_date = this.datePipe.transform(data['competition']['start_date'],"yyyy-MM-dd");
              this.end_date =   this.datePipe.transform(data['competition']['end_date'],"yyyy-MM-dd"); 
              console.log(this.start_date); //output : 2018-02-13
            }
          }
          );
      }
      this.spinner.hide();

  }

  addCompetitionRequest(event) {
    this.spinner.show();
    console.log(event);
    let contest = {
      contest_name : event.target.elements[0].value,
      category_id : event.target.elements[1].value,
      description : event.target.elements[2].value,
      start_date : event.target.elements[3].value,
      end_date : event.target.elements[4].value,
      consolation_count : event.target.elements[7].value,
      is_publish : this.marked,
      contest_prizes_attributes: [{"prize_id" : event.target.elements[8].value,"rank": "1"}, 
      {"prize_id" : event.target.elements[9].value,"rank": "2"}, 
      {"prize_id" : event.target.elements[10].value,"rank": "3"}]
    }
    let point= {
      like_points : event.target.elements[7].value,
      comment_points : event.target.elements[8].value
    }
    const headersupdate = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': window.sessionStorage.getItem('auth_token') });
    if(this.contest_id == null){
      var endpointuser = new GlobalVariables().API_URL + "contests/create";
      this.http.post(endpointuser, { contest , point }, { headers: headersupdate })
      .subscribe(data => {
        this.data = data;
        this.spinner.hide();
        Swal({
          text: this.data['msg'],
          type: 'success',
          timer: 2000
        }).then((result) => {
          this._router.navigate(['/admin/competitions']);
        });
        }
      );
    }
    else{
      console.log(contest);
      var endpointuser = new GlobalVariables().API_URL + "contests/" + this.contest_id;
      this.http.put(endpointuser, { contest , point }, { headers: headersupdate })
      .subscribe(data => {
        this.data = data;
        this.spinner.hide();
        Swal({
          text: this.data['msg'],
          type: 'success',
          timer: 2000
        }).then((result) => {
          this._router.navigate(['/admin/competitions']);
        });
        }
      );
    }
  }

  goBack(): void {
    this.location.back();
  }
  checkValue(event){
    console.log(event);
    this.isPublish = event['target']['checked'];
  }
  toggleVisibility(e){
    this.marked= e.target.checked;
  }

  onDateChange(event) {
    this.start_date_get = event.target.value; 
    $("#end_date").prop('readonly', false);
  }

}

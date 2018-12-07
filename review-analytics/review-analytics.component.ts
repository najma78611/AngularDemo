import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import {HttpClient} from '@angular/common/http';
import { GlobalVariables } from '../../global-variables';

@Component({
  selector: 'app-review-analytics',
  templateUrl: './review-analytics.component.html',
  styleUrls: ['./review-analytics.component.scss']
})
export class ReviewAnalyticsComponent implements OnInit {
  lineChart= [];
  pieChart=[];
  public contest_participant_count =[];
  public contest_name =[];

  month_name =[];
  user_count =[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    var endpointcount = new GlobalVariables().API_URL + "show_count";
    this.http.get(endpointcount)
    .subscribe(data => {
      this.contest_participant_count = data['contest_vise_participant'][0];
      this.contest_name = data['contest_vise_participant'][1];
    
      this.month_name = data['month_name'];
      this.user_count = data['user_count'];
      this.pieclick();
     
    });
  }

  pieclick(){ 
    this.pieChart = new Chart('pieCharts', {
      type: 'pie',
      data: {
          labels: this.contest_name,
          datasets: [{
             
              data: this.contest_participant_count,
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(0, 128, 128, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(230, 25, 75, 1)',
                  'rgba(60, 180, 75, 1)',
                  'rgba(245, 130, 48, 1)',
                  'rgba(145, 30, 180, 1)',
                  'rgba(210, 245, 60, 1)',

              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: true,
        display:true,
        title: {
        text:"Participants Per Contest Graph",
        display:true
        }
      }
    });

    this.lineChart = new Chart('lineCharts', {
      type: 'bar',
      data: {
      labels: this.month_name,
      datasets: [
        {
          label: '# user count',
          data: this.user_count,
          backgroundColor: [
           'rgba(54, 162, 235, 1)',
           'rgba(255, 99, 132, 1)',
           'rgba(255, 206, 86, 1)',
           'rgba(75, 192, 192, 1)',
           'rgba(153, 102, 255, 1)',
           'rgba(230, 25, 75, 1)',
           'rgba(60, 180, 75, 1)',
           'rgba(245, 130, 48, 1)',
           'rgba(145, 30, 180, 1)',
           'rgba(210, 245, 60, 1)',
           'rgba(0, 128, 128, 1)',
           'rgba(128, 0, 0, 1)'

          ],
          //backgroundColor:'rgba(0, 128, 128, 1)',
          fill:true,
          lineTension:0.2,
          borderWidth: 1
        }
      ]
      },
      options: {
        responsive: true,
        title: {
        text:"Monthly Users Graph",
        display:true
        },
        scales: {
          yAxes:[{
            ticks:{
              beginAtZero:true
            }
          }]
        }
      }
    });
  }

}

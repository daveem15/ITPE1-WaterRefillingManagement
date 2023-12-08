import { Component, OnInit } from '@angular/core';
declare var google:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
constructor(){

}

  ngOnInit(): void {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(this.drawChart);
  }

  drawChart() {
    
    var data = google.visualization.arrayToDataTable([
      ['Address', 'Number of Orders'],
      ['Betes, Aliaga, Nueva Ecija',     1],
      ['Bongabon, Nueva Ecija',      2],
    ]);
    var chart = new google.visualization.PieChart(document.getElementById('divPieChart'));
    chart.draw(data, null);

  }
}

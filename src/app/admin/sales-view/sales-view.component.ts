import { Component, OnInit } from '@angular/core';

declare var google:any;

@Component({
  selector: 'app-sales-view',
  templateUrl: './sales-view.component.html',
  styleUrls: ['./sales-view.component.scss']
})
export class SalesViewComponent implements OnInit{

  constructor() {
  }

  ngOnInit(): void {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(this.drawChart);
    google.charts.setOnLoadCallback(this.drawLine);
  }
drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Element', 'Density', { role: 'style' }],
    ['Distilled', 20, '#b87333'],            // RGB value
    ['Mineral', 0, 'silver'],            // English color name
    ['Alkaline', 40, 'gold'],

  ['Purified', 0, 'color: #e5e4e2' ], // CSS-style declaration
 ]);
 var chart = new google.visualization.ColumnChart(document.getElementById("divColumnChart"));
 chart.draw(data, null);
}

drawLine() {
  var data = google.visualization.arrayToDataTable([
    ['Order', 'Number of Orders'],
    ['Distilled',     1],
    ['Mineral',      0],
    ['Alkaline',  2],
    ['Purified', 0]
  ]);
 var options = {
  pieHole: 0.4,
 };
 var chart = new google.visualization.PieChart(document.getElementById("divDonutChart"));
 chart.draw(data, options);
}


printThisPage(){
window.print();
}
}

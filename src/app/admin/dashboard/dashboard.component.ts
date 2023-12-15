import { Component, OnInit } from '@angular/core';
import { OrderPerAddress } from 'src/app/models/orders_by_address';
import { OrderService } from 'src/app/services/order.service';
declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  totalCustomers: number = 0;
  orderPerAddress: OrderPerAddress[] = [];
  totalOrders: number = 0;
  completedOrders: number = 0;
  constructor(private orderService: OrderService) {
    this.getTotalCustomers();
    this.getTotalAndCompletedOrders();
    this.getOrdersPerAddress();
  }

  ngOnInit(): void {
    this.getTotalAndCompletedOrders();
    this.getTotalCustomers();
  }

  getTotalCustomers() {
    this.orderService.getTotalCustomer().subscribe({
      next: (data) => {
        this.totalCustomers = data['total_customers'] ?? 0;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getOrdersPerAddress() {
    this.orderService.getOrdersPerAddress().subscribe({
      next: (data) => {
        this.orderPerAddress = data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(() => this.drawChart());
      },
    });
  }

  getTotalAndCompletedOrders() {
    this.orderService.getTotalAndCompletedOrders().subscribe({
      next: (data) => {
        this.totalOrders = data['total_orders'] ?? 0;
        this.completedOrders = data['completed_orders'] ?? 0;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  drawChart() {
    const chartData = [['Address', 'Order Percentage']];

    const data = google.visualization.arrayToDataTable([
      ['Product', 'Total Sales'],
      ...this.orderPerAddress.map((product) => [
        product.address,
        Number(product.order_percentage),
      ]),
    ]);
    const options = {
      pieHole: 0.4,
    };

    const chart = new google.visualization.PieChart(
      document.getElementById('divPieChart')
    );

    chart.draw(data, options);
  }

  // drawChart() {
  //   const chartData = [['Address', 'Number of Orders']];

  //   this.orderPerAddress.forEach((addressData) => {
  //     chartData.push([addressData.address, addressData.order_percentage]);
  //   });

  //   const data = google.visualization.arrayToDataTable(chartData);

  //   const options = {
  //     pieHole: 0.4,
  //   };

  //   const chart = new google.visualization.PieChart(
  //     document.getElementById('divPieChart')
  //   );

  //   chart.draw(data, options);
  // }
}

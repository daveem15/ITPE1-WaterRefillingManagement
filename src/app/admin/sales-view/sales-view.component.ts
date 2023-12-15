import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProductSales } from 'src/app/models/sales_per_product';
import { OrderService } from 'src/app/services/order.service';

declare var google: any;

@Component({
  selector: 'app-sales-view',
  templateUrl: './sales-view.component.html',
  styleUrls: ['./sales-view.component.scss'],
})
export class SalesViewComponent implements OnInit, AfterViewInit {
  productSales: ProductSales[] = [];

  constructor(private orderService: OrderService) {
    this.getSalesPerProduct();
  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.getSalesPerProduct();
  }

  drawChart() {
    const data = google.visualization.arrayToDataTable([
      ['Product', 'Total Sales', { role: 'style' }],
      ...this.productSales.map((product) => [
        product.product_name,
        Number(product.total_sales),
        'color: #b87333',
      ]),
    ]);
    const chart = new google.visualization.ColumnChart(
      document.getElementById('divColumnChart')
    );
    chart.draw(data, null);
  }

  drawLine() {
    const data = google.visualization.arrayToDataTable([
      ['Product', 'Total Sales'],
      ...this.productSales.map((product) => [
        product.product_name,
        Number(product.total_sales),
      ]),
    ]);
    const options = {
      pieHole: 0.4,
    };
    const chart = new google.visualization.PieChart(
      document.getElementById('divDonutChart')
    );
    chart.draw(data, options);
  }

  printThisPage() {
    window.print();
  }

  getSalesPerProduct() {
    this.orderService.getTotalSalesPerProduct().subscribe({
      next: (data) => {
        console.log(data);
        this.productSales = data;
        if (this.productSales.length > 0) {
          google.charts.load('current', { packages: ['corechart'] });
          google.charts.setOnLoadCallback(() => this.drawChart());
          google.charts.setOnLoadCallback(() => this.drawLine());
        }
      },
    });
  }
}

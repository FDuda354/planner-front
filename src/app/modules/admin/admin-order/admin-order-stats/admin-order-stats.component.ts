import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Chart, ChartData, registerables} from "chart.js";
import {AdminOrderService} from "../admin-order.service";


@Component({
  selector: 'app-admin-order-stats',
  templateUrl: './admin-order-stats.component.html',
  styleUrls: ['./admin-order-stats.component.css']
})
export class AdminOrderStatsComponent implements AfterViewInit {

  @ViewChild('stats') private stats!: ElementRef;
  chart!: Chart;

  ordersCount: number = 0;
  ordersValue: number = 0;
  private data = {
    labels: [],
    datasets: [
      {
        label: 'Orders',
        data: [],
        borderColor: '#FF3F7C',
        backgroundColor: '#FF7A9F',
        order: 1,
        yAxisID: 'y'
      },
      {
        label: 'Sales',
        data: [],
        borderColor: '#0088FF',
        backgroundColor: '#00A1FF ',
        type: 'line',
        order: 0,
        yAxisID: 'y1'
      }
    ]
  } as ChartData;

  constructor(
    private adminOrderService: AdminOrderService
  ) {
    Chart.register(...registerables)
  }

  ngAfterViewInit(): void {
    this.getSalesStats();
    this.setupChart();
  }

  private setupChart() {
    this.chart = new Chart(this.stats.nativeElement, {
      type: 'bar',
      data: this.data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Sell Chart'
          }
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: false,
            },
          }
        }
      },
    });
  }

  private getSalesStats() {
    this.adminOrderService.getSalesStats().subscribe(
      stats => {
        this.chart.data.labels = stats.labels;
        this.chart.data.datasets![0].data = stats.ordersValue;
        this.chart.data.datasets![1].data = stats.ordersCount;
        this.chart.update();
        this.ordersCount = stats.ordersCount.reduce((a: number, b: number) => a + b);
        this.ordersValue = stats.ordersValue.reduce((a: number, b: number) => a + b);
      }
    );
  }
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('barChart', { static: false }) barChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChart', { static: false }) pieChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lineChart', { static: false }) lineChart!: ElementRef<HTMLCanvasElement>;

  barChartInstance: Chart | undefined;
  pieChartInstance: Chart<"pie"> | undefined; // <- Forzar tipo "pie"
  lineChartInstance: Chart | undefined;

  categoriasCancer = {
    "Sano": 10,
    "Cancer 1": 5,
    "Cancer 2": 15,
    "Cancer 3": 7,
    "Cancer 4": 3,
    "Cancer 5": 2
  };

  ngOnInit(): void { }

  get categoriasCancerEntries() {
    return Object.entries(this.categoriasCancer);
  }

  abrirModal() {
    setTimeout(() => {
      this.createBarChart();
      this.createPieChart();
    }, 0);
  }

  createBarChart() {
    const ctx = this.barChart?.nativeElement.getContext('2d');
    if (!ctx) return;
    if (this.barChartInstance) this.barChartInstance.destroy();

    this.barChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.categoriasCancerEntries.map(entry => entry[0]),
        datasets: [{
          label: 'Cantidad por Estado',
          data: this.categoriasCancerEntries.map(entry => entry[1]),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        scales: {
          x: { beginAtZero: true }
        },
        plugins: {
          legend: { display: false },
        }
      }
    });
  }

  createPieChart() {
    const ctx = this.pieChart?.nativeElement.getContext('2d');
    if (!ctx) return;
    if (this.pieChartInstance) this.pieChartInstance.destroy();

    // Declaramos explícitamente que este gráfico es de tipo "pie"
    this.pieChartInstance = new Chart<"pie">(ctx, {
      type: 'pie',
      data: {
        labels: this.categoriasCancerEntries.map(entry => entry[0]),
        datasets: [{
          label: 'Distribución por Estado',
          data: this.categoriasCancerEntries.map(entry => entry[1]),
          backgroundColor: [
            'green', 'red', 'orange', 'yellow', 'purple', 'blue'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          }
        }
      }
    });
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  categoriasCancer = {
    "Sano": 0,
    "Cancer 1": 0,
    "Cancer 2": 0,
    "Cancer 3": 0,
    "Cancer 4": 0,
    "Cancer 5": 0
  };

  abrirModal() {

  }

  get total() {
    return Object.values(this.categoriasCancer).reduce((a, b) => a + b, 0);
  }

  get categoriasCancerEntries() {
    return Object.entries(this.categoriasCancer);
  }

  getPercentage(value: number) {
    return Math.round((value / this.total) * 100);
  }
}

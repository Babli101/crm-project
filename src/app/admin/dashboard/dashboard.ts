import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { Lead } from '../../services/lead';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, Navbar, Sidebar],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {
  stats = {
    total: 0,
    converted: 0,
    pending: 0
  };

  constructor(private lead: Lead) { }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.lead.getStats().subscribe((res: any) => {
      this.stats = res;
    });
  }
}
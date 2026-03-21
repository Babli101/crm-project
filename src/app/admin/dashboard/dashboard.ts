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
    interested: 0,
    lost: 0,
    pending: 0
  };

  // 🔥 NEW
  todayLeads: any[] = [];
  todayCount = 0;

  constructor(private lead: Lead) { }

  ngOnInit(): void {
    this.loadStats();
    this.loadTodayFollowUps();

    // 🔥 AUTO REFRESH every 10 sec
    setInterval(() => {
      this.loadTodayFollowUps();
    }, 50000);
  }

  loadStats(): void {
    this.lead.getStats().subscribe((res: any) => {
      this.stats = res;
    });
  }

  // 🔥 NEW
  loadTodayFollowUps(): void {
    this.lead.getTodayFollowUps().subscribe((res: any) => {
      this.todayLeads = res;
      this.todayCount = res.length;

      // 🔔 Notification
      if (this.todayCount > 0) {
        setTimeout(() => {
          alert(`🔔 You have ${this.todayCount} follow-ups today`);
        }, 40000);
      }
    });
  }

}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lead } from '../../services/lead';
import { Router, RouterModule } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';
import { Sidebar } from '../../shared/sidebar/sidebar';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, Navbar, Sidebar],
  templateUrl: './calendar.html'
})
export class Calendar implements OnInit {

  leads: any[] = [];
  calendarDays: any[] = [];

  currentDate = new Date();
    today = new Date(); // ✅ ADD THIS

  constructor(private lead: Lead, private router: Router) {}

  ngOnInit() {
    this.getLeads();
  }

  getLeads() {
    this.lead.getLeads().subscribe((res: any) => {
      this.leads = res;
      this.generateCalendar();
    });
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    this.calendarDays = [];

    // empty spaces
    for (let i = 0; i < firstDay; i++) {
      this.calendarDays.push(null);
    }

    // days
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(year, month, i);

      const dayLeads = this.leads.filter(l => {
        if (!l.followUpDate) return false;

        const d = new Date(l.followUpDate);
        return (
          d.getDate() === date.getDate() &&
          d.getMonth() === date.getMonth() &&
          d.getFullYear() === date.getFullYear()
        );
      });

      this.calendarDays.push({
        date,
        leads: dayLeads
      });
    }
  }

  openLead(id: any) {
    this.router.navigate(['/edit-lead', id]);
  }

}
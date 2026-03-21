import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarService } from '../../services/sidebar';
import { Lead } from '../../services/lead';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar implements OnInit {

  notifications: any[] = [];
  showDropdown = false;
  unreadCount = 0;
  audioEnabled = false; // ✅ add

  // 🔊 sound
  audio = new Audio('assets/notification.mp3')

  constructor(
    private router: Router,
    private sidebarService: SidebarService,
    private lead: Lead,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.loadNotifications();

    setInterval(() => {
      this.loadNotifications();
    }, 70000);
  }

 loadNotifications() {
  this.lead.getTodayFollowUps().subscribe((res: any) => {

    if (res.length > this.notifications.length && this.audioEnabled) {
      this.audio.play().catch(() => {});
    }

    this.notifications = res;

    // 🔥 unread = total (initial)
    this.unreadCount = res.length;
  });
}

  toggleDropdown() {
  this.showDropdown = !this.showDropdown;

  if (this.showDropdown) {
    this.unreadCount = 0; // ✅ clear count
  }

  this.audioEnabled = true;
}

  // 🔥 OUTSIDE CLICK CLOSE
  @HostListener('document:click', ['$event'])
  handleClick(event: any) {
    const clickedInside = event.target.closest('.notification-wrapper');
    if (!clickedInside) {
      this.showDropdown = false;
    }
  }

  openLead(id: any) {
    this.showDropdown = false;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/edit-lead', id]);
    });
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../services/sidebar';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar implements OnInit {
  isSidebarOpen = false;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.sidebarService.sidebarOpen$.subscribe((state: boolean) => {
      this.isSidebarOpen = state;
    });
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  closeSidebar() {
    this.sidebarService.closeSidebar();
  }
}
import { Component } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { Lead } from '../../services/lead';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, Navbar, Sidebar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
 stats:any = {};

  constructor(private lead:Lead){}

  ngOnInit(){
    this.loadStats();
  }

  loadStats(){

    this.lead.getStats().subscribe((res:any)=>{
      this.stats = res;
    })

  }
}

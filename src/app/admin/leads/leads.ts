import { Component, OnInit } from '@angular/core';
import { Lead } from '../../services/lead';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../shared/navbar/navbar';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { FilterPipe } from '../../pipes/filter-pipe'; 
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar, Sidebar, FilterPipe, RouterModule],
  templateUrl: './leads.html'
})
export class Leads implements OnInit {

  search = "";
  leads:any = [];

  constructor(private leadService: Lead){}

  ngOnInit(){
    this.loadLeads();
  }

  loadLeads(){
    this.leadService.getLeads().subscribe((res:any)=>{
      this.leads = res;
    });
  }

  deleteLead(id:any){
    if(confirm("Delete this lead?")){
      this.leadService.deleteLead(id).subscribe(()=>{
        this.loadLeads();
      });
    }
  }

}
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Lead } from '../../services/lead';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { Navbar } from '../../shared/navbar/navbar';
@Component({
  selector: 'app-add-lead',
  standalone: true,
  imports: [Navbar, Sidebar, CommonModule, FormsModule],
  templateUrl: './add-lead.html',
  styleUrl: './add-lead.css',
})
export class AddLead {
 name=""
  email=""
  phone=""
  company=""

  constructor(
    private lead:Lead,
    private router:Router
  ){}

  saveLead(){

    this.lead.addLead({
      name:this.name,
      email:this.email,
      phone:this.phone,
      company:this.company
    }).subscribe(()=>{

      this.router.navigate(['/leads'])

    })

  }
}

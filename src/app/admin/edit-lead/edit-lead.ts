import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lead } from '../../services/lead';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../shared/navbar/navbar';
import { Sidebar } from '../../shared/sidebar/sidebar';

@Component({
  selector: 'app-edit-lead',
  standalone: true,
  imports:[CommonModule,FormsModule, Navbar, Sidebar],
  templateUrl:'./edit-lead.html'
})
export class EditLead implements OnInit{

  id:any;

  name="";
  email="";
  phone="";
  company="";
  status="";

  constructor(
    private route:ActivatedRoute,
    private lead:Lead,
    private router:Router
  ){}

  ngOnInit(){

    this.id = this.route.snapshot.paramMap.get("id");

    this.lead.getLead(this.id).subscribe((res:any)=>{

      this.name = res.name;
      this.email = res.email;
      this.phone = res.phone;
      this.company = res.company;
      this.status = res.status;

    })

  }

  updateLead(){

    this.lead.updateLead(this.id,{
      name:this.name,
      email:this.email,
      phone:this.phone,
      company:this.company,
      status:this.status
    }).subscribe(()=>{

      this.router.navigate(['/leads'])

    })

  }

}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Lead } from '../../services/lead';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../shared/navbar/navbar';
import { Sidebar } from '../../shared/sidebar/sidebar';

@Component({
  selector: 'app-edit-lead',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar, Sidebar, RouterModule],
  templateUrl: './edit-lead.html'
})
export class EditLead implements OnInit {

  id: any;

  name = "";
  email = "";
  phone = "";
  company = "";
  status = "";

  followUpDate: any = "";
  noteText = "";
  notes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private lead: Lead,
    private router: Router
  ) { }

  ngOnInit() {

    if (typeof window === 'undefined') return; // ❗ SSR skip

    this.id = this.route.snapshot.paramMap.get("id");

    this.lead.getLead(this.id).subscribe((res: any) => {
      this.name = res.name;
      this.email = res.email;
      this.phone = res.phone;
      this.company = res.company;
      this.status = res.status;

      this.followUpDate = res.followUpDate;
      this.notes = res.notes || [];
    });
  }

  updateLead() {

    console.log("CLICKED UPDATE");
    console.log("ID:", this.id);

    this.lead.updateLead(this.id, {
      name: this.name,
      email: this.email,
      phone: this.phone,
      company: this.company,
      status: this.status
    }).subscribe({
      next: (res) => {
        console.log("SUCCESS:", res);
        alert("Updated ✅");
        this.router.navigate(['/leads']);
      },
      error: (err) => {
        console.log("ERROR:", err);
      }
    });

  }
  updateFollowUp() {

    // 🔥 convert to proper date
    const date = new Date(this.followUpDate);

    console.log("SENDING DATE:", date);

    this.lead.updateFollowUp(this.id, date)
      .subscribe(() => {
        alert("Follow-up saved ✅");
      });
  }

  addNote() {
    if (!this.noteText.trim()) return;

    this.lead.addNote(this.id, this.noteText)
      .subscribe((res: any) => {
        this.notes = res.notes;
        this.noteText = "";
      });
  }

}
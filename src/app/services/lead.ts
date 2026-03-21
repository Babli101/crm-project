import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Lead {

  api = "http://localhost:5000/api/leads";

  constructor(private http: HttpClient) {}

  // ✅ Headers (Auth)
getHeaders() {
  let token = "";

  if (typeof window !== 'undefined') {
    token = localStorage.getItem("token") || "";
  }

  const headers = new HttpHeaders({
    Authorization: token ? `Bearer ${token}` : ""
  });

  return { headers };
}

  // ✅ Get All Leads
  getLeads(){
    return this.http.get(`${this.api}/all`, this.getHeaders());
  }

  // ✅ Add Lead
  addLead(data:any){
    return this.http.post(`${this.api}/create`, data, this.getHeaders());
  }

  // ✅ Get Stats
  getStats(){
    return this.http.get(`${this.api}/stats`, this.getHeaders());
  }

  // ✅ Delete Lead
  deleteLead(id:any){
    return this.http.delete(`${this.api}/lead/${id}`, this.getHeaders());
  }

  // ✅ Get Single Lead
  getLead(id:any){
    return this.http.get(`${this.api}/lead/${id}`, this.getHeaders());
  }

  // ✅ Update Lead
  updateLead(id:any,data:any){
    return this.http.put(`${this.api}/lead/${id}`, data, this.getHeaders());
  }

  // 🔥 NEW FEATURES START HERE

  // ✅ Update Follow-up Date
  updateFollowUp(id: any, date: any){
    return this.http.put(
      `${this.api}/followup/${id}`,
      { followUpDate: date },
      this.getHeaders()
    );
  }

  // ✅ Add Note
  addNote(id: any, text: string){
    return this.http.post(
      `${this.api}/note/${id}`,
      { text },
      this.getHeaders()
    );
  }

  // ✅ Get Today Follow-ups
  getTodayFollowUps(){
    return this.http.get(
      `${this.api}/followups/today`,
      this.getHeaders()
    );
  }

}
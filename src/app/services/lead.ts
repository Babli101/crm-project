import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Lead {

  api = "http://localhost:5000/api/leads";

  constructor(private http: HttpClient) {}

getHeaders(){
  const token = localStorage.getItem("token");

  return {
    headers:{
      Authorization: token || ""
    }
  };
}

  getLeads(){
    return this.http.get(`${this.api}/all`, this.getHeaders());
  }

  addLead(data:any){
    return this.http.post(`${this.api}/create`, data, this.getHeaders());
  }

  getStats(){
    return this.http.get(`${this.api}/stats`, this.getHeaders());
  }

  deleteLead(id:any){
    return this.http.delete(`${this.api}/lead/${id}`, this.getHeaders());
  }

  getLead(id:any){
    return this.http.get(`${this.api}/lead/${id}`, this.getHeaders());
  }

  updateLead(id:any,data:any){
    return this.http.put(`${this.api}/lead/${id}`, data, this.getHeaders());
  }

}
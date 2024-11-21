import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Applicants } from '../models/applicants';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  imports: [CommonModule, HttpClientModule, FormsModule],
  styleUrls: ['./applicant.component.scss'],
  standalone: true
})

export class ApplicantComponent implements OnInit {

  applicants: Applicants[] = [];
  apiUrl = 'https://localhost:7000/Applicants';

  newApplicant: Applicants = {
    companyid: '',
    email: '',
    id: '',
    name: '',
    phoneNumber: ''
  }

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.fetchApplicants();
  }

  fetchApplicants(): void {
    this.http.get<Applicants[]>(this.apiUrl).subscribe(
      {
        next: (data) => {
          this.applicants = data;
          console.log('data ', this.applicants)
        },
        error: (err) => {
          console.error('Error fetching applicant ', err);
        }
      }
    )
  }

  onSubmit(applicant: Applicants): void {

    applicant.id = this.generateUUID();
    applicant.companyid = this.generateUUID();
    
    this.http.post<Applicants>(this.apiUrl, applicant).subscribe({
      next: (response) =>{
        console.log("Applicants Submitted ", Response);
        this.applicants.push(response); // Add the response to the list
        this.newApplicant = { id: '', companyid: '', name: '', email: '', phoneNumber: '' }; // Reset the form
      },

      error: (err) =>{
        console.error(err);
      }
    })
    
  }

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // private applicantWithTheLongestName(applicant: Applicants): string{
  //   if(applicant.name.length == 0){
  //     return "";
  //   }

  //   for(const )
  // }

}

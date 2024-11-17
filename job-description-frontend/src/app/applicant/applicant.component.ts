import { Component } from '@angular/core';

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.scss'],
  standalone: true
})

export class ApplicantComponent {

  applicants: {name: string, email: string, position: string}[] = [];

  onSubmit(name: string, email: string, position: string): void {
    this.applicants.push({ name, email, position });
  }
}

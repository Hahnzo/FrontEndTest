import { Component } from '@angular/core';
import { ApplicantComponent } from './applicant/applicant.component';

@Component({
  selector: 'app-root',
  template: `<app-applicant></app-applicant>`, // Use ApplicantComponent here
  standalone: true,
  imports: [ApplicantComponent]
})
export class AppComponent {}

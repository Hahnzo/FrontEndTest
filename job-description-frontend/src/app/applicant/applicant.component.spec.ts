import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApplicantComponent } from './applicant.component';

describe('ApplicantComponent', () => {
  let component: ApplicantComponent;
  let fixture: ComponentFixture<ApplicantComponent>;
  let httpTestingController: HttpTestingController;

  const mockApplicants = [
    { id: '1', name: 'John Doe', email: 'john@example.com', phoneNumber: '123456' },
    { id: '2', name: 'Jane Doe', email: 'jane@example.com', phoneNumber: '654321' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ApplicantComponent] // Include ApplicantComponent in imports
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure no outstanding HTTP requests
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch applicants successfully', () => {
    // Trigger the fetchApplicants method
    component.fetchApplicants();

    // Mock the GET request
    const req = httpTestingController.expectOne(component.apiUrl);

    // Assert the request method is GET
    expect(req.request.method).toBe('GET');

    // Respond with mock data
    req.flush(mockApplicants);

    // Verify that the component's applicants array is updated correctly
    expect(component.applicants).toEqual(mockApplicants);
    expect(component.applicants.length).toBe(2);
  });

  it('should handle HTTP errors during fetchApplicants', () => {
    // Spy on console.error to verify error handling
    spyOn(console, 'error');

    // Trigger the fetchApplicants method
    component.fetchApplicants();

    // Mock the GET request and respond with an error
    const req = httpTestingController.expectOne(component.apiUrl);
    req.flush('Error fetching applicants', {
      status: 500,
      statusText: 'Internal Server Error'
    });

    // Verify that console.error is called with the error
    expect(console.error).toHaveBeenCalledWith('Error fetching applicant ', jasmine.anything());

    // Verify that the applicants array remains empty
    expect(component.applicants).toEqual([]);
  });
});

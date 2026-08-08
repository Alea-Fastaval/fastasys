import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ParticipantsComponent } from './participants.component';
import { Participant } from '@shared/types/participants.types';

describe('ParticipantsComponent', () => {
  let component: ParticipantsComponent;
  let fixture: ComponentFixture<ParticipantsComponent>;
  let httpMock: HttpTestingController;

  const mockParticipants: Participant[] = [
    {
      id: 1,
      firstName: 'Mads',
      lastName: 'Hansen',
      email: 'mads@fastaval.dk',
      barcode: 'FAST-2026-0001',
      isCheckedIn: false,
    },
    {
      id: 2,
      firstName: 'Sofie',
      lastName: 'Nielsen',
      email: 'sofie@fastaval.dk',
      barcode: 'FAST-2026-0002',
      isCheckedIn: true,
      checkedInAt: '2026-08-08T12:00:00Z',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipantsComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ParticipantsComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load participants on initialization', () => {
    fixture.detectChanges(); // triggers ngOnInit

    const req = httpMock.expectOne('/api/participants');
    expect(req.request.method).toBe('GET');
    req.flush(mockParticipants);

    expect(component.participants().length).toBe(2);
    expect(component.participants()[0].firstName).toBe('Mads');
  });

  it('should filter participants by search query', () => {
    fixture.detectChanges();
    httpMock.expectOne('/api/participants').flush(mockParticipants);

    component.searchQuery = 'Mads';
    component.loadParticipants();

    const req = httpMock.expectOne('/api/participants?search=Mads');
    expect(req.request.method).toBe('GET');
    req.flush([mockParticipants[0]]);

    expect(component.participants().length).toBe(1);
    expect(component.participants()[0].firstName).toBe('Mads');
  });

  it('should perform check-in action for a participant', () => {
    fixture.detectChanges();
    httpMock.expectOne('/api/participants').flush(mockParticipants);

    component.checkIn(1);

    const checkInReq = httpMock.expectOne('/api/participants/1/checkin');
    expect(checkInReq.request.method).toBe('POST');
    checkInReq.flush({});

    // Triggers reload
    const reloadReq = httpMock.expectOne('/api/participants');
    expect(reloadReq.request.method).toBe('GET');
    reloadReq.flush([
      { ...mockParticipants[0], isCheckedIn: true, checkedInAt: '2026-08-08T15:00:00Z' },
      mockParticipants[1],
    ]);

    expect(component.participants()[0].isCheckedIn).toBe(true);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { Card } from './card';

describe('Card Component', () => {
  let component: Card;
  let fixture: ComponentFixture<Card>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card],
    }).compileComponents();

    fixture = TestBed.createComponent(Card);
    component = fixture.componentInstance;
  });

  it('should create card component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render title and subtitle when provided', () => {
    component.title = 'Test Title';
    component.subtitle = 'Test Subtitle';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.atom-card-title')?.textContent?.trim()).toBe('Test Title');
    expect(compiled.querySelector('.atom-card-subtitle')?.textContent?.trim()).toBe('Test Subtitle');
  });

  it('should toggle hoverable class', () => {
    component.hoverable = true;
    fixture.detectChanges();

    const cardElement = (fixture.nativeElement as HTMLElement).querySelector('.atom-card');
    expect(cardElement?.classList.contains('hoverable')).toBe(true);
  });
});

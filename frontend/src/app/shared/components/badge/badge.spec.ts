import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Badge } from './badge';
import { describe, beforeEach, it, expect } from 'vitest';

describe('Badge Component', () => {
  let component: Badge;
  let fixture: ComponentFixture<Badge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Badge],
    }).compileComponents();

    fixture = TestBed.createComponent(Badge);
    component = fixture.componentInstance;
  });

  it('should create the badge component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should default to neutral variant', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const badgeElement = compiled.querySelector('.atom-badge');
    expect(badgeElement?.classList.contains('neutral')).toBe(true);
  });

  it('should update variant class when set', () => {
    component.variant = 'primary';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const badgeElement = compiled.querySelector('.atom-badge');
    expect(badgeElement?.classList.contains('primary')).toBe(true);
  });
});

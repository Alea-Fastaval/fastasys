import { ComponentFixture, TestBed } from '@angular/core/testing';

import { beforeEach, describe, expect, it } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has default inputs (iconPos)', () => {
    // inputs are signals; read via calling them
    expect(component.iconPos()).toBe('right');
  });

  it('renders label when provided and updates when changed', () => {
    // set label via the signal's set method
    (component as any).label.set('Save changes');
    fixture.detectChanges();

    const host = fixture.nativeElement.querySelector('.p-button');
    // PrimeNG places label inside element with class p-button-label
    const labelEl = host.querySelector('.p-button-label');
    expect(labelEl).toBeTruthy();
    expect(labelEl.textContent).toContain('Save changes');

    // update label and verify change reflected in DOM
    (component as any).label.set('Submit');
    fixture.detectChanges();
    expect(host.querySelector('.p-button-label').textContent).toContain('Submit');
  });

  it('shows an icon element when icon input is provided', () => {
    (component as any).icon.set('pi-check');
    fixture.detectChanges();

    const host = fixture.nativeElement.querySelector('.p-button');
    // PrimeNG renders an element with class p-button-icon when an icon is present
    const iconEl = host.querySelector('.p-button-icon');
    expect(iconEl).toBeTruthy();
  });

  it('applies loading state', () => {
    (component as any).loading.set(true);
    fixture.detectChanges();

    const host = fixture.nativeElement.querySelector('.p-button');
    // loading state usually adds a p-button-loading class or spinner element
    expect(host.classList.contains('p-button-loading') || host.querySelector('.p-button-loading-icon')).toBeTruthy();
  });

  it('disables underlying button when disabled input is true', () => {
    (component as any).disabled.set(true);
    fixture.detectChanges();

    const nativeBtn = fixture.nativeElement.querySelector('button');
    // either native disabled attribute is present or PrimeNG sets p-disabled class
    const hasDisabledAttr = nativeBtn
      ? nativeBtn.hasAttribute('disabled') || (nativeBtn as HTMLButtonElement).disabled
      : false;
    const hasDisabledClass = fixture.nativeElement.querySelector('.p-button')?.classList.contains('p-disabled');
    expect(hasDisabledAttr || hasDisabledClass).toBeTruthy();
  });
});

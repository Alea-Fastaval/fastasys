import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type SupportedLang = 'en' | 'da';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly http = inject(HttpClient);

  public readonly currentLang = signal<SupportedLang>('en');
  public readonly translations = signal<Record<string, any>>({});

  constructor() {
    const saved =
      typeof localStorage !== 'undefined' && localStorage.getItem
        ? (localStorage.getItem('fastasys_lang') as SupportedLang) || 'en'
        : 'en';
    this.setLanguage(saved);
  }

  public setLanguage(lang: SupportedLang): void {
    this.currentLang.set(lang);
    if (typeof localStorage !== 'undefined' && localStorage.setItem) {
      localStorage.setItem('fastasys_lang', lang);
    }

    this.http.get<Record<string, any>>(`/assets/i18n/${lang}.json`).subscribe({
      next: dictionary => this.translations.set(dictionary),
      error: err => console.error(`Failed to load translation file for ${lang}`, err),
    });
  }

  public translate(key: string, params?: Record<string, string>): string {
    if (!key) return '';
    const dict = this.translations();
    const parts = key.split('.');
    let current: any = dict;

    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        return key;
      }
    }

    if (typeof current !== 'string') return key;

    let result = current;
    if (params) {
      Object.keys(params).forEach(paramKey => {
        result = result.replace(new RegExp(`{{\\s*${paramKey}\\s*}}`, 'g'), params[paramKey]);
      });
    }

    return result;
  }
}

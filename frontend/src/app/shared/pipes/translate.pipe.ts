import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslationService } from '@shared/services';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  private readonly translationService = inject(TranslationService);

  public transform(key: string, params?: Record<string, string>): string {
    // Reading translations() here registers a signal dependency.
    // When the dictionary loads (async HTTP), Angular re-renders every
    // component that uses this pipe — no zones or pure:false needed.
    this.translationService.translations();
    return this.translationService.translate(key, params);
  }
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonModule, ButtonSeverity } from 'primeng/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonModule],
})
export class Button {
  readonly icon = input<string>();
  readonly label = input<string>();
  readonly text = input<boolean>(false);
  readonly plain = input<boolean>(false);
  readonly rounded = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly size = input<'small' | 'large'>();
  readonly variant = input<'text' | 'outlined'>();
  readonly iconPos = input<'left' | 'right'>('right');
  readonly severity = input<ButtonSeverity>('primary');
}

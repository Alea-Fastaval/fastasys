import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrl: './button.scss',
  imports: [MatButtonModule, MatIconModule],
})
export class Button {
  readonly icon = input<string>();
  readonly label = input<string>();
  readonly disabled = input<boolean>(false);
  readonly variant = input<'flat' | 'raised' | 'stroked' | 'text'>('flat');
  readonly color = input<'primary' | 'accent' | 'warn'>('primary');
}

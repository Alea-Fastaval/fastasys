import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from '@shared/components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Toolbar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}

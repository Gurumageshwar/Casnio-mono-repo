import { Component } from '@angular/core';
import { FIREBALL_ICONS } from 'apps/fireball/src/fireball-icons';

@Component({
  selector: 'app-home',
  template: `
    <div class="home">
      <mat-icon class="icon" [svgIcon]="ICONS.LOGO"></mat-icon>
      <mat-icon class="icon" [svgIcon]="ICONS.SPINNER"></mat-icon>
      <mat-icon class="icon" [svgIcon]="ICONS.MENU"></mat-icon>
      <h1>Fireball Casino</h1>
      <p>Welcome to Fireball Casino — your premium gaming destination.</p>
    </div>
  `,
  styles: [`
    .home {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #1a0a00 0%, #2d1a00 100%);
      color: #fff;
      font-family: 'Inter', sans-serif;
    }
    .icon { height: 50px; width: 100px;}
    h1 { font-size: 3rem; margin-bottom: 1rem; }
    p { font-size: 1.2rem; opacity: 0.7; }
  `]
})
export class HomeComponent {
  readonly ICONS = FIREBALL_ICONS
}

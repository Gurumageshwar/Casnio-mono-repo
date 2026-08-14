import { Component } from '@angular/core';
import { LEMON_ICONS } from 'apps/lemon/src/lemon-icons';

@Component({
  selector: 'app-home',
  template: `
    <div class="home">
      <mat-icon class="icon" [svgIcon]="ICONS.LOGO"></mat-icon>
      <mat-icon class="icon" [svgIcon]="ICONS.PIG"></mat-icon>
      <mat-icon class="icon menu" [svgIcon]="ICONS.MENU"></mat-icon>
      <h1>  Lemon Casino</h1>
      <p>Welcome to Lemon Casino — your premium gaming destination.</p>
    </div>
  `,
  styles: [`
    .home {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #0d0d14 0%, #1a1a2e 100%);
      color: #fff;
      font-family: 'Inter', sans-serif;
    }
    .icon { height: 50px; width: 100px;}
    .menu {
      color: red;
    }
    h1 { font-size: 3rem; margin-bottom: 1rem; }
    p { font-size: 1.2rem; opacity: 0.7; }
  `],
})
export class HomeComponent {

  readonly ICONS = LEMON_ICONS
}

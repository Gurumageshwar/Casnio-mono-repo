import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="home">
      <h1>WatchMeWin Casino</h1>
      <p>Welcome to WatchMeWin Casino — your premium gaming destination.</p>
    </div>
  `,
  styles: [`
    .home {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #0a001a 0%, #1a002d 100%);
      color: #fff;
      font-family: 'Inter', sans-serif;
    }
    h1 { font-size: 3rem; margin-bottom: 1rem; }
    p { font-size: 1.2rem; opacity: 0.7; }
  `]
})
export class HomeComponent {}

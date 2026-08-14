import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  token: string;
  roles: string[];
}

/**
 * Shared auth service — manages login state across all casino apps.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user$ = new BehaviorSubject<AuthUser | null>(null);
  readonly user$: Observable<AuthUser | null> = this._user$.asObservable();

  get isLoggedIn(): boolean {
    return !!this._user$.value;
  }

  setUser(user: AuthUser | null): void {
    this._user$.next(user);
  }

  logout(): void {
    this._user$.next(null);
  }
}

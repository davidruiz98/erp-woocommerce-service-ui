import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

// Tipado completo (puedes moverlo a un archivo aparte types/auth.d.ts)
export interface JwtPayload {
  sub: string;          // ID de usuario
  exp: number;          // Expiración (timestamp)
  iat: number;          // Fecha de emisión
  username: string;     // Nombre de usuario (ajusta según tu API)
  email?: string;       // Email (opcional)
  roles?: string[];     // Roles del usuario
}

export interface AuthResponse {
  token: string;
  user?: Pick<JwtPayload, 'username' | 'email'>; // Datos adicionales del usuario
}

export interface RegisterData {
  username: string;
  password: string;
  email?: string;
  [key: string]: any; // Para propiedades adicionales
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly apiUrl = 'https://tu-app.herokuapp.com/api/auth';

  // Estado del usuario con tipado explícito
  private currentUserSubject = new BehaviorSubject<{ token: string; data: JwtPayload } | null>(null);
  public readonly currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.initializeAuthState();
  }

  // ==================== MÉTODOS PÚBLICOS ==================== //
  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response) => this.handleAuthSuccess(response)),
      catchError((error: HttpErrorResponse) => this.handleAuthError(error))
    );
  }

  register(userData: RegisterData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData).pipe(
      tap((response) => this.handleAuthSuccess(response)),
      catchError((error: HttpErrorResponse) => this.handleAuthError(error))
    );
  }

  logout(redirectTo: string = '/auth/login'): void {
    this.clearAuthState();
    this.router.navigateByUrl(redirectTo);
  }

  get isAuthenticated(): boolean {
    const user = this.currentUserSubject.value;
    return !!user && !this.isTokenExpired(user.data.exp);
  }

  get currentToken(): string | null {
    return this.currentUserSubject.value?.token || null;
  }

  get currentUserData(): JwtPayload | null {
    return this.currentUserSubject.value?.data || null;
  }

  // ==================== MÉTODOS PRIVADOS ==================== //
  private initializeAuthState(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) return;

    try {
      const parsedData = JSON.parse(storedUser) as { token: string; data: JwtPayload };
      if (!this.isTokenExpired(parsedData.data.exp)) {
        this.currentUserSubject.next(parsedData);
      } else {
        this.clearAuthState();
      }
    } catch (error) {
      console.error('Error parsing stored user data', error);
      this.clearAuthState();
    }
  }

  private handleAuthSuccess(response: AuthResponse): void {
    const decoded = jwtDecode<JwtPayload>(response.token);
    const authData = { 
      token: response.token,
      data: { ...decoded, ...response.user } // Combina datos del token y respuesta
    };
    
    localStorage.setItem('currentUser', JSON.stringify(authData));
    this.currentUserSubject.next(authData);
  }

  private handleAuthError(error: HttpErrorResponse): Observable<never> {
    this.clearAuthState();
    let errorMessage = 'Error de autenticación';
    
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.status === 0) {
      errorMessage = 'Error de conexión con el servidor';
    }

    return throwError(() => new Error(errorMessage));
  }

  private clearAuthState(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  private isTokenExpired(expTimestamp: number): boolean {
    return Date.now() >= expTimestamp * 1000;
  }
}
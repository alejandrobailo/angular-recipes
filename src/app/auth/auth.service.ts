import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import User from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
	kind: string;
	idToken: string;
	email: string;
	refreshToken: string;
	expiresIn: string;
	localId: string;
	registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
	user = new BehaviorSubject<User>(null);
	private tokenExpirationTimer: any;

	constructor(private http: HttpClient, private router: Router) {}

	signup(email: string, password: string) {
		return this.http
			.post<
				AuthResponseData
			>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA33lnhxv-7jGLYhJaPYQJua3JawDOVlSU', {
				email: email,
				password: password,
				returnSecureToken: true
			})
			.pipe(
				catchError(this.handleError),
				tap((resData) => {
					this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
				})
			);
	}

	login(email: string, password: string) {
		return this.http
			.post<
				AuthResponseData
			>(
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA33lnhxv-7jGLYhJaPYQJua3JawDOVlSU',
				{
					email: email,
					password: password,
					returnSecureToken: true
				}
			)
			.pipe(
				catchError(this.handleError),
				tap((resData) => {
					this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
				})
			);
	}

	autoLogin() {
		const userData: User = JSON.parse(localStorage.getItem('userData'));

		if (!userData) {
			return;
		}

		if (userData['_token']) {
			this.user.next(userData);
			const expirationDuration = new Date(userData['_tokenExpirationDate']).getTime() - new Date().getTime();
			this.autoLogout(expirationDuration);
		}
	}

	logout() {
		this.user.next(null);
		this.router.navigate([ '/auth' ]);
		localStorage.removeItem('userData');
		if (this.tokenExpirationTimer) {
			clearTimeout(this.tokenExpirationTimer);
		}
		this.tokenExpirationTimer = null;
	}

	autoLogout(expirationDate: number) {
		console.log(expirationDate);
		this.tokenExpirationTimer = setTimeout(() => {
			this.logout();
		}, expirationDate);
	}

	private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
		// tap operator just execute some code with the response in a pipe
		const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
		// getTime give us the date in miliseconds thats why we multiply the exporesIn
		const user = new User(email, userId, token, expirationDate);
		this.user.next(user);
		this.autoLogout(expiresIn);
		localStorage.setItem('userData', JSON.stringify(user));
	}

	private handleError(errorRes: HttpErrorResponse) {
		let errorMessage = 'An unknown error occurred!';
		if (!errorRes.error || !errorRes.error.error) {
			return throwError(errorMessage);
		}
		switch (errorRes.error.error.message) {
			case 'EMAIL_EXISTS':
				errorMessage = 'This email exists already';
				break;
			case 'EMAIL_NOT_FOUND':
				errorMessage = 'This email does not exists';
				break;
			case 'INVALID_PASSWORD':
				errorMessage = 'This password is not correct';
				break;
		}
		return throwError(errorMessage);
	}
}

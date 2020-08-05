import { Action } from '@ngrx/store';

export const AUTHENTICATE_SUCCESS = '[Auth] AUTHENTICATE_SUCCESS';
export const LOGOUT = '[Auth] LOGOUT';
export const LOGIN_START = '[Auth] LOGIN_START';
export const AUTHENTICATE_FAIL = '[Auth] AUTHENTICATE_FAIL';
export const SIGNUP_START = '[Auth] SIGNUP_START';
export const CLEAR_ERROR = '[Auth] CLEAR_ERROR';
export const AUTO_LOGIN = '[Auth] AUTO_LOGIN';

export class AuthenticateSuccess implements Action {
	readonly type = AUTHENTICATE_SUCCESS;

	constructor(public payload: { email: string; userId: string; token: string; expirationDate: Date }) {}
}

export class Logout implements Action {
	readonly type = LOGOUT;
}

export class LoginStart implements Action {
	readonly type = LOGIN_START;

	constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticateFail implements Action {
	readonly type = AUTHENTICATE_FAIL;

	constructor(public payload: string) {}
}

export class SignupStart implements Action {
	readonly type = SIGNUP_START;

	constructor(public payload: { email: string; password: string }) {}
}

export class ClearError implements Action {
	readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
	readonly type = AUTO_LOGIN;
}

export type AuthActions =
	| AuthenticateSuccess
	| Logout
	| LoginStart
	| AuthenticateFail
	| SignupStart
	| ClearError
	| AutoLogin;

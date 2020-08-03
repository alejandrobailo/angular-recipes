import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import * as frommApp from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effect';

@NgModule({
	declarations: [ AppComponent, HeaderComponent ],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		StoreModule.forRoot(frommApp.appReducer),
		EffectsModule.forRoot([ AuthEffects ]),
		SharedModule,
		CoreModule
	],
	bootstrap: [ AppComponent ]
})
export class AppModule {}

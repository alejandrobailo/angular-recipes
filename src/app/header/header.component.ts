import { Component, OnInit } from '@angular/core';
import { DataStorage } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit {
	collapsed = true;
	private userSub: Subscription;
	isAuthenticated: boolean = false;

	constructor(private dataStorageService: DataStorage, private authService: AuthService) {}

	ngOnInit() {
		this.userSub = this.authService.user.subscribe((user) => {
			this.isAuthenticated = !user ? false : true;
			// or
			// this.isAuthenticated = !!user;
			// it is the same
		});
	}

	onSaveData() {
		this.dataStorageService.storeRecipes();
	}

	onFetchData() {
		this.dataStorageService.fetchRecipes().subscribe();
	}

	onLogout() {
		this.authService.logout();
	}

	ngOnDestroy() {
		this.userSub.unsubscribe();
	}
}

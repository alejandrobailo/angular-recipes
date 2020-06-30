import { Component } from '@angular/core';
import { DataStorage } from '../shared/data-storage.service';

@Component({
	selector: 'app-header',
	templateUrl: 'header.component.html'
})
export class HeaderComponent {
	collapsed = true;

	constructor(private dataStorageService: DataStorage) {}

	onSaveData() {
		this.dataStorageService.storeRecipes();
	}

	onFetchData() {
		this.dataStorageService.fetchRecipes().subscribe();
	}
}

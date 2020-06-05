import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
	providedIn: 'root'
})
export class ShoppingListService {
	private ingredients: Ingredient[];
	ingredientsChanged = new EventEmitter<Ingredient[]>();

	constructor() {
		this.ingredients = [ new Ingredient('Apples', 5), new Ingredient('Tomato', 10) ];
	}

	getIngredients() {
		return this.ingredients.slice();
	}

	addIngredient(ingredient: Ingredient) {
		this.ingredients.push(ingredient);
		this.ingredientsChanged.emit(this.ingredients.slice());
	}

	addIngredients(ingredients: Ingredient[]) {
		this.ingredients.push(...ingredients);
		this.ingredientsChanged.emit(this.ingredients.slice());
	}
}

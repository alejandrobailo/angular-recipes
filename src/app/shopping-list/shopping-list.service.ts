import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

@Injectable({
	providedIn: 'root'
})
export class ShoppingListService {
	private ingredients: Ingredient[];
	ingredientsChanged = new Subject<Ingredient[]>();
	startedEditing = new Subject<number>();

	constructor() {
		this.ingredients = [ new Ingredient('Apples', 5), new Ingredient('Tomato', 10) ];
	}

	getIngredients() {
		return this.ingredients.slice();
	}

	getIndredient(index: number) {
		return this.ingredients[index];
	}

	addIngredient(ingredient: Ingredient) {
		this.ingredients.push(ingredient);
		this.ingredientsChanged.next(this.ingredients.slice());
	}

	addIngredients(ingredients: Ingredient[]) {
		this.ingredients.push(...ingredients);
		this.ingredientsChanged.next(this.ingredients.slice());
	}

	updateIngredient(index: number, newIngredient: Ingredient) {
		this.ingredients[index] = newIngredient;
		this.ingredientsChanged.next(this.ingredients.slice());
	}

	deleteIngredient(index: number) {
		this.ingredients.splice(index, 1);
		this.ingredientsChanged.next(this.ingredients.slice());
	}
}

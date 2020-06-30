import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class RecipeService {
	private recipes: Recipe[];
	recipeChanges = new Subject<Recipe[]>();

	constructor(private shoppingListService: ShoppingListService) {
		this.recipes = new Array();
		// this.recipes = [
		// 	new Recipe(
		// 		'A test recipe',
		// 		'A test description',
		// 		'https://www.pequerecetas.com/wp-content/uploads/2020/03/cochinita-pibil-ingredientes.jpg',
		// 		[ new Ingredient('Apples', 5), new Ingredient('Melon', 2) ]
		// 	),
		// 	new Recipe(
		// 		'Another test recipe',
		// 		'Another test description',
		// 		'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg',
		// 		[ new Ingredient('Flour', 100), new Ingredient('Butter', 25) ]
		// 	)
		// ];
	}

	setRecipes(recipes: Recipe[]) {
		this.recipes = recipes;
		this.recipeChanges.next(this.recipes.slice());
	}

	getRecipes() {
		return this.recipes.slice();
		// slice para que devuelva una copia
	}

	getRecipe(index: number) {
		return this.recipes[index];
	}

	addIngredientsToShoppingList(ingredients: Ingredient[]) {
		this.shoppingListService.addIngredients(ingredients);
	}

	addRecipe(recipe: Recipe) {
		this.recipes.push(recipe);
		this.recipeChanges.next(this.recipes.slice());
	}

	updateRecipe(index: number, newRecipe: Recipe) {
		this.recipes[index] = newRecipe;
		this.recipeChanges.next(this.recipes.slice());
	}

	onDeleteRecipe(index: number) {
		this.recipes.splice(index, 1);
		this.recipeChanges.next(this.recipes.slice());
	}
}

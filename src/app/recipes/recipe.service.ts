import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
	providedIn: 'root'
})
export class RecipeService {
	recipeSelected = new EventEmitter<Recipe>();
	private recipes: Recipe[];

	constructor(private shoppingListService: ShoppingListService) {
		this.recipes = [
			new Recipe(
				'A test recipe',
				'A test description',
				'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg',
				[ new Ingredient('Apples', 5), new Ingredient('Melon', 2) ]
			),
			new Recipe(
				'Another test recipe',
				'Another test description',
				'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg',
				[ new Ingredient('Flour', 100), new Ingredient('Butter', 25) ]
			)
		];
	}

	getRecipes() {
		return this.recipes.slice();
		// slice para que devuelva una copia
	}

	addIngredientsToShoppingList(ingredients: Ingredient[]) {
		this.shoppingListService.addIngredients(ingredients);
	}
}

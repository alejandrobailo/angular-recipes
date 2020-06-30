import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({ providedIn: 'root' })
export class DataStorage {
	constructor(private http: HttpClient, private recipeService: RecipeService) {}

	storeRecipes() {
		const recipes = this.recipeService.getRecipes();
		this.http
			.put('https://angular-course-recipes-eb83a.firebaseio.com/recipes.json', recipes)
			.subscribe((response) => {
				console.log(response);
			});
	}

	fetchRecipes() {
		return this.http.get<Recipe[]>('https://angular-course-recipes-eb83a.firebaseio.com/recipes.json').pipe(
			map((recipes) =>
				recipes.map((recipe) => {
					return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
				})
			),
			tap((recipes) => {
				this.recipeService.setRecipes(recipes);
			})
		);
	}
}

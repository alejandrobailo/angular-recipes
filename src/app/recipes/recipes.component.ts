import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
	selector: 'app-recipes',
	templateUrl: './recipes.component.html',
	styleUrls: [ './recipes.component.css' ]
})
export class RecipesComponent implements OnInit {
	selectedRecipe: Recipe;

	constructor(private recipeService: RecipeService) {}

	ngOnInit() {
		// Nos subscribimos al evento del servicio
		this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
			this.selectedRecipe = recipe;
		});
	}
}

import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-recipe-list',
	templateUrl: './recipe-list.component.html',
	styleUrls: [ './recipe-list.component.css' ]
})
export class RecipeListComponent implements OnInit, OnDestroy {
	recipes: Recipe[] = new Array();
	subscription: Subscription;

	constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {}

	ngOnInit() {
		this.subscription = this.recipeService.recipeChanges.subscribe((recipes: Recipe[]) => {
			this.recipes = recipes;
		});
		this.recipes = this.recipeService.getRecipes();
	}

	onNewRecipe() {
		this.router.navigate([ 'new' ], { relativeTo: this.route });
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}

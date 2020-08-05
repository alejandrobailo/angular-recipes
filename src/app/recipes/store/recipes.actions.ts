import { Action } from '@ngrx/store';

import { Recipe } from '../recipe.model';

export const SET_RECIPES = '[Recipes] Set Recipes';
export const DELETE_RECIPE = '[Recipes] Delete Recipe';
export const UPDATE_RECIPE = '[Recipes] Update Recipe';

export class SetRecipes implements Action {
	readonly type = SET_RECIPES;

	constructor(public payload: Recipe[]) {}
}

export type RecipesActions = SetRecipes;

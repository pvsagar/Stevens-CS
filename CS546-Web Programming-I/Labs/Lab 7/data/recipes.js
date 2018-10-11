

const uuid = require('uuid');
const mongoCollection = require('../config/mongoCollection');
const recipes = mongoCollection.recipes;
let exportMethods = {
// Get all recipes
getAllRecipes () {
    return recipes().then(recipesCollection => {
        let values = recipesCollection.find({}).project({title:1}).toArray();
        return values   
    });
},
// Get recipe by ID
getRecipeById (id) {
    return recipes().then(recipesCollection => {
        return recipesCollection.findOne({ _id: id }).then(recipeItem => {
            if (!recipeItem) throw "No recipe found";
            return recipeItem;
        });
    });
},
// Adding a New recipe
createRecipe (title, ingredients, steps)  {
    return recipes().then((recipeCollection) => {
        let newRecipe = {
            _id: uuid.v4(),
            title: title,
            ingredients: ingredients,
            steps: steps,
        };
        return recipeCollection.insertOne(newRecipe)
            .then((newRecipeInformation) => {
                return newRecipeInformation.insertedId;
            })
            .then((newRecipeId) => {
                return this.getRecipeById(newRecipeId);
            }
        );
    });
},
// Updating the recipe with ID using PUT
updateRecipe (id, recipeUpdates) {
    return this.getRecipeById(id).then(currentRecipe => {
        let RecipeUpdateInfo = {
            title: recipeUpdates.title,
            ingredients:recipeUpdates.ingredients,
            steps: recipeUpdates.steps
        };
        let updateCommand = {
            $set: RecipeUpdateInfo
        };
        return recipes().then(recipeCollection => {
            return recipeCollection.updateOne({ _id: id }, updateCommand).then(() => {
                return this.getRecipeById(id);
            });
        });
    });
},
// Updating the recipe with ID using PATCH
selectupdate(id, selectupdate) {
    return recipes().then(recipeCollection => {
        let UpdateInfo = {};                
        if(selectupdate.title){
            UpdateInfo.title=selectupdate.title;
        }
        if(selectupdate.ingredients){
            UpdateInfo.ingredients=selectupdate.ingredients;
        }
        if(selectupdate.steps){
            UpdateInfo.steps=selectupdate.steps;
        }
        let updateCommand = {
            $set: UpdateInfo
        };
        return recipeCollection.updateOne({ _id: id }, updateCommand).then((result) => {
        return this.getRecipeById(id);
        });
    });        
},    
// Delete a recipe of specified id
deleteRecipe (id) {
    return recipes().then((recipeCollection) => {
        return recipeCollection.removeOne({ _id: id }).then((deletedRecipe) => {
            if (deletedRecipe.deletedCount === 0) {               // validating delete
                throw `Could not delete recipe with id of ${id}`;
            }
        });
    });
}
};
module.exports = exportMethods;


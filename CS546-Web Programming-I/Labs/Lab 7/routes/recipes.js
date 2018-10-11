

const express = require('express');
const router = express.Router();
const data = require('../data');
const recipesData = data.recipes;
// route for getting all recipes
router.get("/", async (req, res) => {
    try {
        const recipesList = await recipesData.getAllRecipes();
        res.json(recipesList);
    }catch (err) {
        res.sendStatus(500);
    }
});
// route for getting recipe by id
router.get("/:id", async (req, res) => {
    try {
      const recipeItem = await recipesData.getRecipeById(req.params.id);
      res.json(recipeItem);
    } catch (err) {
      res.status(404).json({ message: "recipe does not exist!" });
    }
});
// route for posting recipe
router.post("/", async (req, res) => {
    const newRecipe = req.body;
    if (!newRecipe) {
        res.status(400).json({error: "no data for recipe"});
        return;
    }
    if (!newRecipe.title) {
        res.status(400).json({error: "recipe title not provided"});
        return;
    }
    if (!newRecipe.ingredients) {
        res.status(400).json({error: "recipe ingredients not provided"});
        return;
    }
    if (!newRecipe.steps) {
        res.status(400).json({error: "recipe steps not provided"});
        return;
    }
    try{
        let newRecipeItem = await recipesData.createRecipe(
            newRecipe.title,
            newRecipe.ingredients,
            newRecipe.steps);
            if (newRecipeItem.ingredients.length === 0) {
                res.status(400).json({error: "recipe ingredients not provided"});
                return;
            }
            if (newRecipeItem.steps.length === 0) {
                res.status(400).json({error: "recipe steps not provided"});
                return;
            }
        res.json(newRecipeItem);
        }
    catch(err) {
        res.sendStatus(500).json({ error: err });
    }
});
// route for updating entire recipe
router.put("/:id", async (req, res) => {
    let newRecipe = req.body;
    // const updatedData = req.body;
    if (!newRecipe) {
        res.status(400).json({error: "no data for recipe"});
        return;
    }
    if (!newRecipe.title) {
        res.status(400).json({error: "recipe title not provided"});
        return;
    }
    if (!newRecipe.ingredients) {
        res.status(400).json({error: "recipe ingredients not provided"});
        return;
    }
    if (!newRecipe.steps) {
        res.status(400).json({error: "recipe steps not provided"});
        return;
    }
    try {
        await recipesData.getRecipeById(req.params.id);
    } catch (e) {
        res.sendStatus(404);
    }
  
    try {
        const updatedRecipe = await recipesData.updateRecipe(req.params.id, newRecipe);
        if (updatedRecipe.ingredients.length === 0) {
            res.status(400).json({error: "recipe ingredients not provided"});
            return;
        }
        if (updatedRecipe.steps.length === 0) {
            res.status(400).json({error: "recipe steps not provided"});
        return;
        }
        res.json(updatedRecipe);
    } catch (err) {
    res.sendStatus(500).json({ error: err });
    }
});
// route for patching recipe
router.patch("/:id", async (req, res) => {
    let newRecipe = req.body;
    if (!newRecipe) {
        res.status(400).json({error: "recipe not provided"});
        return;
    }
    try {
        await recipesData.getRecipeById(req.params.id);
    } catch (err) {
        res.sendStatus(404).json({ error: err });
    }
    try {
        const updatedRecipe = await recipesData.selectupdate(req.params.id, newRecipe);
        res.json(updatedRecipe);
    } catch (err) {
        res.sendStatus(500).json({ error: err });
    }
});
// route for deleting recipe
router.delete("/:id", async (req, res) => {
    try {
        await recipesData.getRecipeById(req.params.id);
    } catch (err) {
        res.status(404).json({ error: "Recipe not found" });
        return;
    }
  
    try {
        await recipesData.deleteRecipe(req.params.id);
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(500).json({ error: err });
        return;
    }
});


module.exports = router;


const express = require('express');
const app = require('../app');
const router = express.Router();
const db = require('../connection');

// to get all recipes
router.route('/')
    .get((req, res, next) => {
        db.query('Select name, category from recipes', (error, results, fields) => {
            if (error) {
                return res.writeHead(500, `Unable to retrieve data - ${error.message}`)
            }

            res.send(results)
        })
    })
    // to add a recipe
    .post((req, res, next) => {
        db.query('INSERT INTO recipes (name, ingredients, directions) VALUES (?, ?, ?)',
            [req.body.name, req.body.ingredients, req.body.directions],
            (error, results, fields) => {
                if (error) {
                    return res.writeHead(500, `Unable to add recipe - ${error.message}`)
                }
                if (results.affectedRows === 0) {
                    return res.send('Unable to add recipe')
                };

                const recipe = { ...req.body, id: results.insertId }
                //return location, id and recipe upon successful insert
                res.status(201)
                    .location(`${req.baseUrl}/${recipe.id}`)
                    .send(recipe)
            })
    })


// to get a single recipe
router.route('/:id')
    .get((req, res, next) => {
        db.query('Select * from recipes WHERE id = ?',
            [req.params.id],
            (error, results, fields) => {
                if (error) {
                    return res.writeHead(500, `Unable to retrieve data - ${error.message}`)
                }
                if (!results.length) {
                    return res.status(404).send('We could not find an entry with the provided ID')
                }
                res.statusCode = 200;
                res.send(results)
            })
    })
    // to update a recipe
    // bug - the default value will be the string 'name' instead of setting the name value to itself
    // fixed! - use the IFNULL function in the sql query (- have not found a way to escape the string characters from the javascript end)
    .put((req, res, next) => {
        const query = db.query('UPDATE recipes SET name = IFNULL(?, name), category = IFNULL(?, category), ingredients = IFNULL(?, ingredients), directions = IFNULL(?, directions) WHERE id = ?',
            [req.body.name, req.body.category, req.body.ingredients, req.body.directions, req.params.id],
            (error, results, fields) => {
                console.log(query.sql);
                if (error) {
                    console.log(error);
                    return res.writeHead(500, `Unable to edit recipe - ${error.message}`);
                }
                if (results.changedRows === 0) {
                    res.status(404)
                    return res.send('Unable to edit recipe')
                }

                console.log(results);
                res.status(200).send('Succesfully updated');
            })
    })
    // to delete a recipe
    .delete((req, res, next) => {
        db.query('DELETE from recipes WHERE id = ?', [req.params.id],
            (error, results, fields) => {
                if (error) {
                    // handle error
                    console.log(error);
                    return res.writeHead(500, `Unable to delete recipe #${req.params.id} - ${error.message}`)
                }

                if (results.affectedRows === 0) {
                    // return a message indicating that no rows were deleted
                    return res.status(404).send('Recipe not found')
                }

                res.status(200).send(`Successfully deleted recipe #${req.params.id}`)
            })
    })






module.exports = router;
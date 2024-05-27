// RecipeList.js

import React, { useState, useEffect } from 'react';
import Layout from '../Dashboard/index.js';
import './Recipes.css'; // Import the CSS file

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/recipes')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setRecipes(data.recipes);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Layout>
      <div className="recipe-list-container">
        <table className="recipe-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Ingredients</th>
              <th>Instructions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map(recipe => (
              <tr key={recipe.id}>
                <td>{recipe.name}</td>
                <td>{recipe.ingredients}</td>
                <td>{recipe.instructions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default RecipeList;

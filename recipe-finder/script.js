async function searchRecipe() {
  const input = document.getElementById("search-input").value.trim();
  const container = document.getElementById("recipe-container");

  if (!input) {
    alert("Please enter a recipe name.");
    return;
  }

  container.innerHTML = "Loading...";

  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`);
    const data = await res.json();

    if (!data.meals) {
      container.innerHTML = `<p>No recipe found for "${input}".</p>`;
      return;
    }

    const meal = data.meals[0];
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }

    container.innerHTML = `
      <h2>${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <h3>Ingredients:</h3>
      <ul>${ingredients.map(item => `<li>${item}</li>`).join("")}</ul>
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
    `;
  } catch (error) {
    container.innerHTML = "<p>Something went wrong. Please try again.</p>";
    console.error(error);
  }
}

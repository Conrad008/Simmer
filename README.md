## Simmer | Recipe planner

 **Simmer** is a recipe browsing and weekly meal planning app. Discover recipes, save your favorites and  build out a week of meals
## Project Overview

 Built as a final project to demonstrate React fundamentals: component composition, client-side routing, derived state, and persistence without a backend.It demonstrates key components of REACT such as use of Hooks, Fetching of data from APIs, and use of components libraries.

## Problem statement
 Simmer is designed to help people able to easily accses some of their favourite recipies and save them for use to the favourites page. they are also able to add their own unique recipies for later use. 

## Features

 **Browse recipes** — searchable, filterable grid of recipes (by cuisine and meal type)
 Recipe details — full ingredient list and step-by-step instructions
 
 **Favorites** — save recipes you love, persisted across sessions
 Weekly meal plan — assign recipes to Breakfast, Lunch, and Dinner across all 7 days
 
 **Add your own recipes** — create custom recipes with your own title, image (via URL), cuisine, meal type, prep time, servings, ingredients, and instructions. Edit or delete any recipe you've added, all saved to your browser so they're there next time you visit.

## Tech Stack

  **Vite**
  **REACT**
  **shadcn**
  **tailwindcss**
  **localStorage**
  **vercel**

## Project Structure
```

src/
├── components/
│   ├── ui/
│   │   └── Button.jsx
│   ├── Footer.jsx
│   ├── RecipeCard.jsx
│   ├── RecipeList.jsx
│   └── RecipieSearch.jsx
├── context/
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
├── pages/
│   ├── Home.jsx
│   ├── FavoritesPage.jsx
│   ├── MyRecipesPage.jsx
│   ├── RecipeDetailPage.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── RecipesPage.jsx
├── App.jsx
├── index.css
└── main.jsx

# Root Files
├── index.html
├── LICENSE
└── README.md

```

## Visual Identity

* **Simmered Tomato** #C84B31 ( An energetic, appetite-stimulating red for Primary actions, buttons, highlights)

* **Olive Herb** #5D6E55 (A muted green that grounds the design for Secondary accents, tags, active states)

* **Bright Ivory** #F9F9F6 (Clean, crisp, and highly readable for the Background) 
 
* **Smoky Obsidian** #2D3130 (A soft black for modern typography Text)

* **Typography** Headings — Fraunces (serif) Body — Instrument Sans (sans-serif)

## Collaboration & Contribution

We welcome contributions from the community and the team to help ensure that simmer is at the forefront of all Recipie planners around the tech scene

## How to Contribute

1. **Fork the Repository:** Create your own copy of the project to work on.
2. **Create a Feature Branch:**

```bash
git checkout -b feature/AmazingFeature

```
3. **Commit Your Changes:**

```bash
    git commit -m 'Add some AmazingFeature'
```

4.  **Push to the Branch:**
```bash
    git push origin feature/AmazingFeature
```

5.  **Open a Pull Request:** Describe your changes and submit for review.

**Coding Standards**
*   Ensure all HTML is semantic and well-commented.
*   Maintain the **Garden Fresh** color palette for all UI additions.
*   Test responsiveness across multiple screen sizes before submitting.


## Getting Started

**Prerequisites**
Any modern web browser (Chrome, Firefox, Safari, or Edge).

Installation
1. **Clone the repository:**
   
```bash
   git clone https://github.com/Conrad008/Simmer.git
   cd BakeBox
```

2. **Open the project:**
Simply open the index.html file in your preferred browser to view the current build.

## how to Test
This project uses jest test runner

### Prerequisites

Ensure you have installed all project dependencies before running the tests:

1. **install Jest**

```bash
npm install --save-dev jest

```

2. **Running the tests**

```bash
npm test

```

## License

This project is licensed under the MIT License.

## Author
**conrad kipngeno**
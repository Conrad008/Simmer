## Simmer | Recipe planner

 **Simmer** is a recipe discovery app. Browse recipes, save your own favorites, and add your own creations — visible to everyone using the app.
## Project Overview

 Built as a final project to demonstrate React fundamentals: component composition, client-side routing, derived state, and persistence without a backend.It demonstrates key components of REACT such as use of Hooks, Fetching of data from APIs, and use of components libraries.

## Problem statement
 Simmer is designed to help people able to easily accses some of their favourite recipies and save them for use to the favourites page. they are also able to add their own unique recipies for later use. 

## Features

* **Browse recipes** — a responsive grid of recipes with photo, name, and prep time

* **Recipe details** — a dedicated page per recipe with the full description, ingredient list, and step-by-step instructions

* **Favorites** — save recipes you love; stored locally in your browser, specific to you and your device

* **Add your own recipes** — create custom recipes (name, prep time, description, ingredients, steps, and an optional image URL) right from the Home page. These are public — visible to every user of the app, not just you

* **Edit & delete your own recipes** — only the person who created a recipe can edit or delete it, enforced both in the UI and via Firestore Security Rules

* **Authentication** — real accounts via Firebase: email/password sign-up and login, plus "Sign in with Google"

* **Dark mode** — full light/dark theming across every page

* **Fully responsive** — mobile, tablet, and desktop layouts throughout

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
├── config/
│   └── firebase.js          # Firebase app initialization (auth + Firestore)
├── context/
│   └── AuthContext.jsx      # Firebase auth state, login/register/logout, Google sign-in
│   |── ThemeContext.jsx     # Dark and light mode configuration
├── data/
│   └── recipes.json         # Mock recipe dataset (served from /public)
├── components/
│   ├── Navbar.jsx
│   ├── RecipeCard.jsx       # Card with favorite, edit, and delete controls
│   ├── RecipeList.jsx       # Fetches + merges Firestore and mock recipes; filters for favorites/custom
│   └── AddRecipeForm.jsx    # Create AND edit form for user recipes (Firestore-backed)
├── pages/
│   ├── Landing.jsx          # Public hero page with CTAs
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Home.jsx             # Authenticated landing page: welcome header, add-recipe form, testimonials
│   ├── Recipes.jsx          # Browse all recipes
│   ├── RecipeDetail.jsx     # Full recipe view (ingredients, steps, description)
│   ├── Favorites.jsx        # Recipes favorited on this device
│   └── MyRecipes.jsx        # Recipes created by the current user
├── App.jsx
└── main.jsx

```

## Visual Identity

* **Simmered Tomato** #C84B31 ( An energetic, appetite-stimulating red for Primary actions, buttons, highlights)

* **Olive Herb** #5D6E55 (A muted green that grounds the design for Secondary accents, tags, active states)

* **Bright Ivory** #F9F9F6 (Clean, crisp, and highly readable for the Background) 
 
* **Smoky Obsidian** #2D3130 (A soft black for modern typography Text)

* **Typography** Headings — Fraunces (serif) Body — Instrument Sans (sans-serif)

## Data Model
 
Simmer combines two data sources for recipes:
 
1. **Mock dataset** (`recipes.json`) — a static, read-only library of ~20 built-in recipes shipped with the app, served as a static file
2. **Firestore `recipes` collection** — recipes created by users via the "Add your own recipe" form on the Home page. Each document is tagged with:
   - `createdBy` — the Firebase UID of the person who created it
   - `createdByName` — their display name or email, shown as attribution
   - `isCustom: true` — distinguishes it from the mock dataset
   - `createdAt` — a server timestamp
Both sources are merged at render time so the main Recipes page shows everything together. The **My Recipes** page filters that same Firestore collection down to just the recipes where `createdBy` matches the currently logged-in user.
 
**Favorites** are handled entirely differently — they're personal, per-device, and never leave the browser. They're stored in `localStorage` as a simple array of recipe IDs and are not synced to any account or server

### Firestore Security Rules
 
Since recipes are public and shared, access is enforced server-side (not just hidden in the UI):
 
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /recipes/{recipeId} {
      allow read: if true;
      allow create: if request.auth != null
                    && request.resource.data.createdBy == request.auth.uid;
      allow update, delete: if request.auth != null
                             && resource.data.createdBy == request.auth.uid;
    }
  }
}
```
 
Anyone can read the recipe collection; only a logged-in user can create a recipe (tagged to their own UID); and only the original creator can edit or delete their own recipe.
 
---

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
npm
A Firebase project with Authentication (Email/Password + Google providers enabled) and Firestore set up

### Environment variables
 
Create a `.env` file at the project root with your Firebase project's config:
 
```

VITE_API_KEY=your_key
VITE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_project.appspot.com
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
VITE_MEASURMENT_ID=your_measurement_id

```
 
### Firestore setup
 
1. In the Firebase Console, enable **Email/Password** and **Google** under Authentication → Sign-in method
2. Create a Firestore database
3. Paste the Security Rules shown above into Firestore → Rules, and publish

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

##  Live Demo
 
* **https://simmer-black.vercel.app/**

## License

This project is licensed under the MIT License.

## Author
**conrad kipngeno**
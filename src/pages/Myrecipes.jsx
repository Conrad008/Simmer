import RecipeList from "@/components/RecipeList";

export default function MyRecipes() {
  return (
    <div className="min-h-screen bg-ivory dark:bg-obsidian">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mb-8 sm:mb-10">
          <h1 className="font-serif text-3xl font-medium tracking-tight text-obsidian dark:text-ivory sm:text-4xl">
            My Recipes
          </h1>
          <p className="mt-2 text-sm text-obsidian/60 dark:text-ivory/60 sm:text-base">
            Recipes you've added yourself.
          </p>
        </div>

        <RecipeList customOnly />
      </div>
    </div>
  );
}
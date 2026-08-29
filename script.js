const search = document.getElementById("search");
const cards = document.querySelectorAll(".game-card");
const categories = document.querySelectorAll(".category");
const noResults = document.getElementById("noResults");
const gameCount = document.getElementById("gameCount");

let currentCategory = "all";

function filterGames() {

```
const query = search.value.toLowerCase().trim();

let visible = 0;

cards.forEach(card => {

    const name = card.dataset.name.toLowerCase();
    const category = card.dataset.category;

    const matchesSearch =
        name.includes(query);

    const matchesCategory =
        currentCategory === "all" ||
        category === currentCategory;

    if (matchesSearch && matchesCategory) {

        card.style.display = "";

        visible++;

    } else {

        card.style.display = "none";

    }

});

gameCount.textContent =
    `${visible} game${visible === 1 ? "" : "s"}`;

noResults.style.display =
    visible === 0 ? "block" : "none";
```

}

search.addEventListener("input", filterGames);

categories.forEach(button => {

```
button.addEventListener("click", () => {

    categories.forEach(btn =>
        btn.classList.remove("active")
    );

    button.classList.add("active");

    currentCategory =
        button.dataset.category;

    filterGames();

});
```

});

/* FAVORITES */

document.querySelectorAll(".favorite").forEach(button => {

```
const game = button.dataset.game;

const favorites =
    JSON.parse(
        localStorage.getItem("favorites") || "[]"
    );

if (favorites.includes(game)) {
    button.classList.add("active");
}


button.addEventListener("click", () => {

    let favorites =
        JSON.parse(
            localStorage.getItem("favorites") || "[]"
        );

    if (favorites.includes(game)) {

        favorites =
            favorites.filter(item => item !== game);

        button.classList.remove("active");

    } else {

        favorites.push(game);

        button.classList.add("active");

    }

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

});
```

});

/* DARK / LIGHT MODE */

const themeButton =
document.getElementById("themeButton");

themeButton.addEventListener("click", () => {

```
document.body.classList.toggle("light");

const light =
    document.body.classList.contains("light");

localStorage.setItem(
    "theme",
    light ? "light" : "dark"
);
```

});

if (localStorage.getItem("theme") === "light") {
document.body.classList.add("light");
}

/* SCROLL */

function scrollToGames() {

```
document.getElementById("gamesSection")
    .scrollIntoView({
        behavior: "smooth"
    });
```

}

/* INITIAL COUNT */

filterGames();

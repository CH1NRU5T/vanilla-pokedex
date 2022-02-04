// const pokemons = ["Bulbasaur", "Ivysaur", "Venusaur", "Charmander"];
const baseUrl = "https://pokeapi.co/api/v2/pokemon";
function updateUI(pokemons) {
  let container = document.querySelector("#container");
  pokemons.forEach((element) => {
    let card = document.createElement("div");
    card.className = "card";
    let name = document.createElement("h1");
    let type = document.createElement("h2");
    var pokemonName = element.name;
    name.innerHTML = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    // handling image
    let imageDiv = document.createElement("div");
    imageDiv.className = "imageDiv";
    let image = document.createElement("img");
    const imageUrl = getData(baseUrl + "/" + pokemonName).then((res) => {
      return res.sprites.front_default;
    });
    imageUrl.then((url) => {
      image.src = url;
    });
    image.alt = "google";
    image.style.width = "100px";
    image.style.height = "100px";
    image.style.scale = "100px";

    // handling types
    const types = getData(baseUrl + "/" + pokemonName).then((res) => {
      return res.types;
    });

    type.innerText = "Type: \n";
    types.then((typesArr) => {
      for (var i = 0; i < typesArr.length; i++) {
        var lowName =
          typesArr[i].type.name.charAt(0).toUpperCase() +
          typesArr[i].type.name.slice(1);
        type.innerHTML += lowName + "&nbsp";
      }
      // typesArr.forEach((e) => (type.innerHTML += e.type.name + "&nbsp"));
    });
    imageDiv.appendChild(image);
    card.appendChild(imageDiv);
    card.appendChild(name);
    card.appendChild(type);
    container.appendChild(card);
  });
}
function renderData() {
  const pokemons = getData(baseUrl + "?limit=1118").then((result) => {
    return result.results;
  });
  pokemons.then((data) => updateUI(data));
}
function getData(url) {
  let answer = fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      return res;
    });
  return answer;
}

renderData();

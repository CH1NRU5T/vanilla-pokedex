// const pokemons = ["Bulbasaur", "Ivysaur", "Venusaur", "Charmander"];
const typesColorMap = {
  grass: "#78C850",
  fire: "#F08030",
  bug: "#A8B820",
  normal: "#A8A878",
  water: "#6890F0",
  electric: "#F8D030",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F8C0B0",
  rock: "#B8A038",
  ghost: "#705898",
  dark: "#705848",
  dragon: "#7038F8",
  steel: "#B8B8D0",
  fairy: "#F0B6BC",
};
// background:
//         linear-gradient(to left top, rgba(0, 255, 255, 1) 0%, rgba(0, 255, 255, 1) 50%, rgba(255, 255, 0, 1) 50% ),
//         linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 1));
const baseUrl = "https://pokeapi.co/api/v2/pokemon";
function updateUI(pokemons) {
  let container = document.querySelector("#container");
  pokemons.forEach((element) => {
    let card = document.createElement("div");
    card.className = "card";
    let name = document.createElement("h1");
    let type = document.createElement("h2");
    var pokemonName = element.name;
    name.innerHTML = firstLetterCapital(pokemonName);
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
    image.alt = pokemonName;
    image.style.width = "100px";
    image.style.height = "100px";
    image.style.scale = "100px";

    // handling types
    const types = getData(baseUrl + "/" + pokemonName).then((res) => {
      return res.types;
    });

    type.innerText = "Type: \n";
    types.then((typesArr) => {
      // card.style.backgroundColor = typesColorMap[typesArr[0].type.name];
      // card.style.background = `
      //            linear-gradient(to left top, $(typesColorMap[typesArr[0].type.name]) 0%, $(typesColorMap[typesArr[0].type.name]) 50%, $(typesColorMap[typesArr[1].type.name])) 50% ),
      //            linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 1));`;
      if (typesArr.length > 1) {
        card.style.background =
          "linear-gradient(to bottom right, " +
          typesColorMap[typesArr[0].type.name] +
          " 43% , " +
          typesColorMap[typesArr[1].type.name] +
          " 57%)";
      } else {
        card.style.background = typesColorMap[typesArr[0].type.name];
      }

      for (var i = 0; i < typesArr.length; i++) {
        // typesColorMap[typesArr[0].type.name];
        var lowName = firstLetterCapital(typesArr[i].type.name);
        type.innerHTML += lowName + "&nbsp";
      }
      // typesArr.forEach((e) => (type.innerHTML += e.type.name + "&nbsp"));
    });
    imageDiv.appendChild(image);
    card.appendChild(imageDiv);
    card.appendChild(name);
    // console.log(typesColorMap["green"]);
    card.appendChild(type);
    container.appendChild(card);
  });
}

function firstLetterCapital(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function renderData() {
  const pokemons = getData(baseUrl + "?limit=151").then((result) => {
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

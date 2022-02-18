const cards = document.querySelector(".cards");

function generateCard(cardData) {
  document.title += ` - ${cardData.Title}`;

  return `
  <div class="card container w-100 h-100">
    <div class="row d-flex flex-column flex-md-row align-items-center justify-content-center h-100">

      <div class="col-12 col-md-6 col-lg-5 d-flex align-items-center justify-content-center">
        <figure>
          <img class="p-3 p-md-5 p-md-0" src="${cardData.Poster}" alt="Capa do filme">
        </figure>
      </div>

      <div class="col-12 col-md-6 col-lg-5 p-md-5 d-flex flex-column align-items-left">
        <div class="mb-2 mb-md-5">
          <h1 class="title d-inline-block mb-md-2">${cardData.Title}</h1>
          <div>
            <p class="me-2 me-md-5 badge bg-primary d-inline-block">${cardData.Year}</p>
            <p class="sub-titles d-inline-block">${cardData.Runtime}</p>
          </div>
        </div>
        <p class="description mb-4">${cardData.Plot}</p>
      </div>

      <div class="col-12 col-lg-2 mt-md-3 mt-lg-0 d-flex flex-column">
          <p class="sub-titles">Elenco: <span class="sub-titles">${cardData.Actors}</span></p><br>
        <p class="sub-titles mt-3 mt-md-5 m-lg-0">Gênero: <span class="sub-titles">${cardData.Genre}</span></p><br>
        <p class="sub-titles mt-3 mt-md-5 m-lg-0">Diretor: <span class="sub-titles">${cardData.Director}</span></p><br>
      </div>

    </div>
  </div>
`;
}

const search = document.querySelector(".buscar");

function removeButton() {
  const button = document.querySelector("button");
  button.parentNode.removeChild(button);
  return;
}

async function pesquisar() {
  if (!search.classList.contains("active")) {
    search.classList.add("active");

    search.focus();
    return;
  }

  const movieSearched = search.value.toLowerCase();

  // Chamar a api de filme
  // FORMA SINCRONA DE CHAMAR UMA API
  // fetch(`https://www.omdbapi.com/?t=${search.value}&apikey=10109cdf`)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //     cards.innerHTML = generateCard(data);
  //   });

  const movieExists = localStorage.getItem(movieSearched);

  if (movieExists) {
    cards.innerHTML = generateCard(JSON.parse(movieExists));
    search.value = "";
    return;
  }

  const request = await fetch(
    `https://www.omdbapi.com/?t=${movieSearched}&apikey=10109cdf`
  );

  const response = await request.json();

  localStorage.setItem(movieSearched, JSON.stringify(response));

  cards.innerHTML = generateCard(response);

  // FORMA ASSÍNCRONA DE CHAMAR UMA API

  search.value = "";
}

// Funções passadas como parâmetro de outras funções são chamadas de CALLBACK
search.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    pesquisar();
  }
});

// const tags = ["p", "h1", "h2", "h3", "h4", "h5", "h6"];

// const indiceRandomico = Math.floor(Math.random() * 7);

// const randomTag = tags[indiceRandomico];

// console.log(randomTag, indiceRandomico);

// const conteudo = {
//   text: "lorem",
//   tag: "h1",
// };

// cards.innerHTML = `<${conteudo.tag}> ${conteudo.text} </${conteudo.tag}>`;

// console.log(cards);

// const card = document.querySelector(".card");
// const name = document.querySelector(".name");
// const poster = document.querySelector(".poster");
// const description = document.querySelector(".description");

// name.innerText = mock.Title;

// poster.src = mock.Poster;

// const firstWord = mock.Plot.split(" ")[0];

// const remainingText = mock.Plot.split(" ").slice(1).join(" ");

// description.innerHTML = `<p><strong>${firstWord}</strong> ${remainingText}</p>`;

// Criando um elemento HTML a partir do javascript

// Forma 1
// const testeElemento = document.createElement("div");
// description.appendChild(testeElemento);

// Forma 2
// const testeElement = `<div id="${mock.Type}"></div>`;

// description.innerHTML += testeElement;

// const teste = document.querySelector(`#${mock.Type}`);

// console.log(teste);

// console.log(typeof remainingText);
// console.log(remainingText);

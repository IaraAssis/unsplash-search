const acessKey = "15soR-LrsJjwOhBslBt5hBzhKgz9pAgynlADzm15Wvg"
const SEARCH_FORM = document.querySelector("#search-form")
const SEARCH_BOX = document.querySelector("#search-box")
const SEARCH_RESULTS = document.querySelector("#search-results")
const BTN_SHOW_MORE = document.querySelector("#btn-show-more")

let keyword = "";
let page = 1;

// função principal para buscar imagens
async function searchImage(termo) {
    keyword = SEARCH_BOX.value // pega a palavra atual

    const url = `https://api.unsplash.com/search/photos?client_id=${acessKey}&query=${keyword}&page=${page}&per_page=9`

    // Mostrar o loader antes de buscar
    document.querySelector("#loader").style.display = "block"

    //fetch= chama o site Unsplash e pede os dados a ele
    //await = espera o Unsplash responder
    //.then(res => res.json()) Pega os dados e converte para JSON

    const data = await fetch(url).then(res => res.json());

    // Esconder o loader depois de carregar
    document.querySelector("#loader").style.display = "none"

    if (page === 1) {
        SEARCH_RESULTS.innerHTML = ""
    }

    // cria as imagens
    const results = data.results

    results.map((result) => {
        const image = document.createElement("img")
        image.src = result.urls.small
        image.classList.add("fade-in"); // adiciona a classe fade-in
        image.loading = "lazy"; //só carrega a img qdo ela aparece na tela
        image.onload = () => {
            image.classList.add("loaded") // quando carregar, ativa o fade
        }

        const imageLink = document.createElement("a")
        imageLink.target = "_blank"
        imageLink.appendChild(image)
        SEARCH_RESULTS.appendChild(imageLink)
        
    })
    BTN_SHOW_MORE.style.display = "block" // mostra o botão "carregar mais"
}

//funcao quando o formulário é enviado (aperta Enter ou clica em buscar)
SEARCH_FORM.addEventListener("submit", (e) => {
    e.preventDefault() // impede o navegador de recarregar
    keyword = SEARCH_BOX.value; 
    page = 1; // volta para a página 1
    searchImage();
})

// quando clicar no botão "Carregar Mais"
BTN_SHOW_MORE.addEventListener("click", () => {
    page++
    searchImage();
})

// Quando a página terminar de carregar, anima o formulário
window.addEventListener('load', () => {
    const form = document.querySelector("#search-form");
    form.classList.add('form-loaded');
});
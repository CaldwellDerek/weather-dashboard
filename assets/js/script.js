let leftSide = document.querySelector('.left-side');
let searchField = document.querySelector('.search-field');
let searchButton = document.querySelector('.search-btn');

searchButton.addEventListener('click', ()=> {
    let text = searchField.value;
    let searchResult = document.createElement('button');
    searchResult.textContent = text;
    leftSide.append(searchResult);
})
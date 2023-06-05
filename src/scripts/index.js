import { renderDarkMode } from "./theme.js";
import { products, categories } from "./productsData.js";
import { filterProducts } from "./filter.js";



const creatCards = (element) => {
    const liTag = document.createElement("li");
    const divImg = document.createElement("div");
    const imgTag = document.createElement("img");
    const divInfo = document.createElement("div");
    const divSpan = document.createElement("div");
    const spanName = document.createElement("span");
    const spanYear = document.createElement("span");
    const divTitle = document.createElement("div");
    const h4Tag = document.createElement("h4");
    const divValue = document.createElement("div");
    const spanValue = document.createElement("span");
    const buttonBuy = document.createElement("button");

    liTag.className = "cards__content";

    divImg.className = "img__container";

    imgTag.className = "cards__img";
    imgTag.src = element.img;
    imgTag.alt = `album ${element.title}`;

    divInfo.className = "cards__information";

    divSpan.className = "cards__span";

    spanName.className = "text-1";
    spanName.innerText = element.band;

    spanYear.className = "text-1";
    spanYear.innerText = element.year;

    h4Tag.className = "title-2";
    h4Tag.innerText = element.title;

    divValue.className = "cards__value";

    spanValue.className = "text-3";
    spanValue.innerText = `R$ ${element.price.toFixed(2)}`;

    buttonBuy.className = "button__cards";
    buttonBuy.innerText = "Comprar";

    divImg.append(imgTag);
    divSpan.append(spanName, spanYear);
    divTitle.appendChild(h4Tag);
    divValue.append(spanValue, buttonBuy);
    divInfo.append(divSpan, divTitle, divValue);

    liTag.append(divImg, divInfo);

    return liTag;
}

export const render = (arr) => {
    const ulTag = document.querySelector(".cards__list");
    ulTag.innerHTML = "";

    arr.forEach(element => {
        const elementCard = element;
        const cards = creatCards(elementCard);
        ulTag.appendChild(cards);
    });
}

const renderFilterButton = (category, value) => {
    const liTag = document.createElement("li");
    const labelTag = document.createElement("label");
    const inputTag = document.createElement("input");
    const htmlTag = document.querySelector("html");

    labelTag.classList.add("text-1");
    labelTag.htmlFor = category;
    labelTag.innerText = category;
    inputTag.type = "radio";
    inputTag.id = category
    inputTag.name = "category";
    inputTag.value = value;
    inputTag.hidden = true;

    if(htmlTag.classList.contains("dark__mode")){
        labelTag.classList.add("filter__button-dark")
    }else{
        labelTag.classList.add("filter__button")
    }

    liTag.append(labelTag, inputTag);

    return liTag;
}

const renderButtons = (arr) => {
    const ulTag = document.querySelector(".filter__buttons-container");
    ulTag.innerHTML = "";

    arr.forEach((element, index) => {
        const category = element;
        let value = index;
        const button = renderFilterButton(category, value);
        ulTag.appendChild(button);
    });
}


const lastPreferenceFilter = ()=>{
    const lastFilter = localStorage.getItem("lastButtonClicked");
    const buttons = document.querySelectorAll(".filter__section > nav > .filter__buttons-container > li > label");
    const htmlTag = document.querySelector("html");
    

    buttons.forEach(button =>{
        if(button.innerText === lastFilter && htmlTag.classList.contains("dark__mode")){
            button.classList.add("filter__button-dark-selected");
        }else if(button.innerText === lastFilter && !htmlTag.classList.contains("dark__mode")){
            button.classList.add("filter__button-selected");
        }
    })
}

const buttonSelected = () => {
    const buttons = document.querySelectorAll(".filter__section > nav > .filter__buttons-container > li > label");
    const htmlTag = document.querySelector("html");

    buttons.forEach(button =>{
        button.addEventListener("click", ()=>{
            buttons.forEach(selectedButton =>{
                if(selectedButton.classList.contains("filter__button-selected") || selectedButton.classList.contains("filter__button-dark-selected") )
                    selectedButton.classList.remove("filter__button-selected");
                    selectedButton.classList.remove("filter__button-dark-selected");
            })

            localStorage.setItem("lastButtonClicked", button.innerText);
            if(htmlTag.classList.contains("dark__mode")){
                button.classList.add("filter__button-dark-selected");         
            }else{
                button.classList.add("filter__button-selected");
            }
        })
    })
}

const filterButtonDark = ()=>{
    const htmlTag = document.querySelector("html");
    const buttons = document.querySelectorAll(".filter__section > nav > .filter__buttons-container > li > label");
    const buttonDarkMode = document.querySelector(".header__button-dark-mode");
    
    buttonDarkMode.addEventListener("click", ()=>{
        buttons.forEach(button =>{
            if(htmlTag.classList.contains("dark__mode")){
                button.classList.replace("filter__button", "filter__button-dark");
            }else{
                button.classList.replace("filter__button-dark", "filter__button");
            }

            if(button.classList.contains("filter__button-dark-selected")){
                button.classList.replace("filter__button-dark-selected", "filter__button-selected");
            }else{
                button.classList.replace("filter__button-selected", "filter__button-dark-selected")
            }
        })
    }) 
}


renderDarkMode();
renderButtons(categories);
buttonSelected();
filterButtonDark();
lastPreferenceFilter();
filterProducts(products);






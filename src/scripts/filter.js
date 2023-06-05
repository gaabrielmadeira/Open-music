import { render } from "./index.js";
import { products } from "./productsData.js";

export const filterProducts = (arr) => {
    const inputs = document.querySelectorAll(".filter__buttons-container > li > input");
    const inputRange = document.querySelector("#inputRange");
    const spanTag = document.querySelector("#rangeSpan");
    const emptySection = document.querySelector(".empty__section");
    const sectionCards = document.querySelector(".cards__list")

    inputs.forEach(input => {
        input.addEventListener("click", () => {
            const filteredByButton = arr.filter(product => {
                if (Number(input.value) === Number(product.category)) {
                    return true;
                } else if (input.value === "0") {
                    return products;
                }
            });
            if(filteredByButton.length === 0){
                emptySection.style.display = "flex";
                sectionCards.innerHTML = ""; 
            }else{
                emptySection.style.display = "none";
                sectionCards.innerHTML = ""; 
                render(filteredByButton);
            }
        });
    });
    
    inputRange.addEventListener("input", () => {
        const formattedValue = `Até R$ ${inputRange.valueAsNumber.toFixed(2)}`;
        spanTag.innerHTML = formattedValue;
        const filteredByRange = arr.filter(product => Number(product.price) <= Number(inputRange.value));
    
        if(filteredByRange.length === 0){
            emptySection.style.display = "flex";
            sectionCards.innerHTML = ""; 
        }else{
            emptySection.style.display = "none";
            sectionCards.innerHTML = ""; 
            render(filteredByRange);
        }
    });
}    








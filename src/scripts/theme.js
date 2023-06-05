
const modeUserPreference= ()=>{
    const modePreference = JSON.parse(localStorage.getItem("dark__mode")); 
    const img = document.querySelector(".header__button-dark-mode > img");
    const htmlTag = document.querySelector("html") 

    if(modePreference){
        img.src = "./src/assets/img/sun.png";
        htmlTag.classList.add("dark__mode");
    }else{
        img.src = "./src/assets/img/moon.png";
        htmlTag.classList.remove("dark__mode");
    }
}

export const renderDarkMode = ()=>{
    const buttonDarkMode = document.querySelector(".header__button-dark-mode");
    const img = document.querySelector(".header__button-dark-mode > img");
    const htmlTag = document.querySelector("html") 
    
    buttonDarkMode.addEventListener("click", ()=>{
        htmlTag.classList.toggle("dark__mode");
        if(htmlTag.classList.contains("dark__mode")){
            img.src = "./src/assets/img/sun.png";
            localStorage.setItem("dark__mode", true);
        }else{
            img.src = "./src/assets/img/moon.png";
            localStorage.setItem("dark__mode", false);
        }
    })

    modeUserPreference();
}


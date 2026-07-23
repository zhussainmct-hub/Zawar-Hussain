const sections = document.querySelectorAll("section");

window.addEventListener("scroll",()=>{

sections.forEach(section=>{

const top=window.scrollY;
const offset=section.offsetTop-250;
const height=section.offsetHeight;

if(top>=offset && top<offset+height){

section.classList.add("active");

}

});

});

document.querySelectorAll("nav a").forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

document.querySelector(this.getAttribute("href")).scrollIntoView({

behavior:"smooth"

});

});

});

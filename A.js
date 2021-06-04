const main = document.querySelector("#main");
const mes = document.querySelector("em");
const nr = document.querySelectorAll(".val");
const egal = document.querySelector("#egal");
const sterge = document.querySelector(".st");
const creeaza = document.querySelector("#notebut");
const fundal = document.querySelector("#fundal");
const night = document.querySelector("#night");
let arr = ['Exersează!', 'Termină-ți tema', 'Ia notițe', 'Cereți ajutor', 'Crede în tine', 'Verificați erorile', 'Stăpâniți conceptele cheie', 'Înțelegeți-vă îndoielile', 'Aplicați matematica!', 'Stabiliți obiective', 'Înțelege greșelile', 'Descompuneți problemele'];
setTimeout(() => {
    alert('Alte resurse de unde poti invata matematica sunt:\nhttps://www.khanacademy.org/math\nhttps://www.mathsisfun.com/\nhttps://mathworld.wolfram.com/');
}, 1800000);
function mesaj() {
    setInterval(function () {
        let font = [ "candara", "geneva", "arial","sans-serif", "courier", "verdana", "helvetica"];
        let randomFont = Math.floor(Math.random() * (font.length - 1));
        mes.style.fontFamily = font[randomFont];
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        mes.style.color = "#" + randomColor;
        if (arr.length === 1){
            event.stopPropagation()
        }
        let randomNumar = Math.floor(Math.random() * (arr.length - 1));
        mes.innerHTML = arr.splice(randomNumar, 1);
    }, 60000);
}
document.addEventListener("keydown", bagaNumarTastatura);
nr.forEach((n)=>n.addEventListener("click", bagaNumar));
sterge.addEventListener("click", stergeNumar);
egal.addEventListener('click', calcul);
creeaza.addEventListener('click', creeazaNotita);
fundal.addEventListener('click', schimbaCuloare);
night.addEventListener('change', nightMode);
function nightMode(){
    if(this.checked){
        document.body.style.background = 'linear-gradient(0deg, rgba(27,147,161,1) 0%, rgba(32,24,77,1) 100%)';
    }
    else{
        document.body.style.background = 'radial-gradient(circle, rgba(240,226,10,1) 8%, rgba(246,11,11,1) 100%)';
    }
}
function stergeNumar(){
    main.value = '';
}
function bagaNumar(n){
    let val = n.target.value;
    if (!main.value.includes("Date")){
        main.value += val;
    }
    else{
        main.value = val;
    }
}
function bagaNumarTastatura(n){
    if (/^[0-9]$/i.test(n.key)){
        let val = n.key;
    if (!main.value.includes("Date")){
        main.value += val;
    }
    else{
        main.value = val;
    }
    }
}
function calcul(){
    try{
        main.value = eval(main.value);
    } catch (error){
        main.value = "Date incorecte";
    }
}
function aparNotite() {
    let ob;
    let salvat = localStorage.getItem('notite');
    if(salvat == null){
        ob = [];
    }
    else{
        ob = JSON.parse(salvat);
    }
    let txt = '';
    ob.forEach(function(element,){
        txt += `<p>${element.text}</p><p>${element.time}</p><button onclick=stergeNotite(this.id) class="sterge">Delete</button>`;
    });
    let txt2 = document.getElementById('notite');
    txt2.innerHTML = txt;
}
function creeazaNotita(){
    let ob;
    let adaugaNotita = document.getElementById('comentariu');
    let salvat = localStorage.getItem('notite');
    if(salvat == null){
        ob = [];
    }
    else{
        ob = JSON.parse(salvat);
    }
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    let ob2 = {text: adaugaNotita.value, time: today};
    ob.push(ob2);
    localStorage.setItem('notite',JSON.stringify(ob));
    adaugaNotita.value = '';
    aparNotite();
}
function stergeNotite(i){
    let ob;
    salvat = localStorage.getItem('notite');
    if(salvat == null){
        ob = [];
    }
    else{
        ob = JSON.parse(salvat);
    }
    ob.splice(i,1);
    localStorage.setItem('notite',JSON.stringify(ob));
    aparNotite();
}
function arataCuloare(){
    fundal.innerText = "Culoare taste: " + window.getComputedStyle(egal).getPropertyValue('background-color');
    fundal.style.backgroundColor = window.getComputedStyle(egal).getPropertyValue('background-color');
}
function schimbaCuloare() {
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    egal.classList.add("val");
    document.querySelectorAll(".but > .val").forEach(function(n){
        n.style.backgroundColor = "#" + randomColor;
    });
    egal.classList.remove("val");
    arataCuloare();
}

window.onload = () => {
    mesaj();
    aparNotite();
    arataCuloare();
}

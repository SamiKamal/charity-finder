import * as mainJavaS from '../main'
let themes, countries = '';

export function showSelection(e) {
    if (e.target.closest('.search__theme') || e.target.closest('.search__theme--ul')){
        document.querySelector('.search__theme--ul').classList.toggle('hide')
    } else {
        document.querySelector('.search__theme--ul').classList.add('hide')
    }
}

export function showOrgs(org, num){
    let p = 0
    // let idStopped;
    org.forEach((el, i) => {
        p++
        if (p <= num){
            showLimited(el)
            org.splice(i, 1)
        } else {
            return;
        }
    })
  }

export function showLimited(el) {
    let img = ''
    let url = ''
    let isArray = Array.isArray(el.themes.theme)
    // display the array in one string
    checkIfThereIsContentInThemes(el.themes.theme, themes)
    checkIfThereIsContentInCountries(el.countries.country, countries)
    // console.log(themes)
    // Check if there is logo url
    if (el.logoUrl){
        img = el.logoUrl._text 
    } else {
        img = './images/logoReplace.jpg'
    }
    if (el.url){ // check if there is url
        url = el.url._text
    } else{
        url = '#'
    }
    let template = `<div class="list__box">
    <div class="list__box--imageBox">
      <a href="${url}" target="_blank"><img src="${img}" alt="" class="list__img"></a>
     </div>
        <div class="list__info">
        <h1 class="heading-1">${el.name._text}</h1>
        <p class="list__id">ID: ${el.id._text}</p>
        <h2 class="list__themes">${themes.slice(0, -1)}</h2>
        <p class="list__location">${el.country._text} , ${el.city._text}</p>
        <p style="opacity: 0; position: absolute;">${countries.slice(0, -1)}</p>
    </div>
    </div>`
    document.querySelector('.browser-screen-loading-content').insertAdjacentHTML('beforebegin', template)
    themes = ''
    countries = ''
}

function checkIfThereIsContentInThemes(el) {
    let isArray = Array.isArray(el)
    if (isArray){ // check if it was array
        el.forEach(xx => {
           themes += ' ' + xx.name._text + ','
        })
    } else if (!el){ // if it isn't put no Themes
    themes = 'No Themes.' 
} else {
        themes += ' ' + el.name._text + ','
    }
}

function checkIfThereIsContentInCountries(el) {
    let isArray = Array.isArray(el)
    if (isArray){ // check if it was array
        el.forEach(xx => {
           countries += ' ' + xx.name._text + ','
        })
    } else if (!el){ // if it isn't put no countries
    countries = 'No Countries.' 
} else {
        countries += ' ' + el.name._text + ','
    }
}
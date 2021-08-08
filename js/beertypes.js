"use strict"

import '../css/main.scss'


window.addEventListener('DOMContentLoaded', init)

function init() {
    loadTypes()

}


async function loadTypes () {
    let response = await fetch('https://foobardata.herokuapp.com/beertypes');
    let data = await response.json()
    handleTypes(data)
}

function handleTypes(data) {
    console.log(data)
    data.forEach(appendTypes)
}

function appendTypes(item) {
    const copy = document.querySelector('#types template').content.cloneNode(true)

    copy.querySelector('[data-info=name]').textContent = item.name
    copy.querySelector('[data-info=category]').textContent = item.category
    copy.querySelector('[data-info=alc]').textContent = item.alc
    copy.querySelector('[data-info=origin]').textContent = getOrigin(item)

    copy.querySelector('[data-info=description]').addEventListener('click', ()=>{
        showModal(item)
    })

    document.querySelector('#types').appendChild(copy)
}

function getOrigin(item){
    const countries = ['Netherlands', 'France', 'Germany', 'Belgium', 'Mexico', 'Brazil']
    const origin = countries[Math.floor(Math.random() * countries.length)];
    return origin
}

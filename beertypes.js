import './main.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'

window.addEventListener('DOMContentLoaded', init)

function init() {
    loadTypes()

    /* Swal.fire({
        template: '#my-template'
      }) */
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
    console.log(item)

    copy.querySelector('[data-info=name]').textContent = item.name
    copy.querySelector('[data-info=category]').textContent = item.category
    copy.querySelector('[data-info=alc]').textContent = item.alc
    copy.querySelector('[data-info=origin]').textContent = getOrigin(item)

    copy.querySelector('[data-info=description]').addEventListener('click', ()=>{
        showModal(item)
    })

    document.querySelector('#types').appendChild(copy)
}

function showModal(item) {
    console.log(item)
    Swal.fire({
        title: item.name,
        text: item.description.appearance,
        confirmButtonText: 'Close'
      })
}

function getOrigin(item){
    const countries = ['Netherlands', 'France', 'Germany', 'Belgium', 'Mexico', 'Brazil']
    const origin = countries[Math.floor(Math.random() * countries.length)];
    return origin
}

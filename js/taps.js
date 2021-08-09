"use strict"

import '../css/main.scss'
import '@fortawesome/fontawesome-free/js/all.min.js'

window.addEventListener('DOMContentLoaded', init)

function init() {
    loadTypes()
}


async function loadTypes () {
    let response = await fetch('https://foobardata.herokuapp.com/');
    let data = await response.json()
    handleTypes(data)
}

function handleTypes(data) {
    console.log(data)
    const mapped = data.taps.map(string=>{
        string.percent = Math.floor(string.level / string.capacity * 100)
        return string
    })

    mapped.forEach(appendTypes)
}

function appendTypes(item) {
    const copy = document.querySelector('template').content.cloneNode(true)
    console.log(item)

    copy.querySelector('[data-info=id]').textContent = item.id + 1
    copy.querySelector('[data-info=name]').textContent = item.beer
    copy.querySelector('[data-info=level]').textContent = item.level
    copy.querySelector('[data-info=capacity]').textContent = item.capacity
    copy.querySelector('[data-info=percent]').textContent = item.percent + '%'
    copy.querySelector('[data-info=status]').textContent = item.inUse ? 'Not used' : 'In use'

    document.querySelector('tbody').appendChild(copy)
}

import './main.scss'

"use strict"

import './main.scss'

const list = [{
    "id": 107,
    "startTime": 1622291201602,
    "order": [
      "El Hefe",
      "Hollaback Lager",
      "Sleighride",
      "Steampunk"
    ],
    "status" : 'Completed'
  },{
    "id": 207,
    "startTime": 1622291321602,
    "order": [
      "El Hefe",
      "Hollaback Lager",
      "Sleighride",
      "Steampunk"
    ],
    "status" : 'Completed'
  },{
    "id": 307,
    "startTime": 1622291741602,
    "order": [
      "El Hefe",
      "Hollaback Lager",
      "Sleighride",
      "Steampunk"
    ],
    "status" : 'Completed'
  }]

window.addEventListener('DOMContentLoaded', init)

function init() {



    selectButtons()
    loadData()
}

function selectButtons() {
    document.querySelectorAll('button').forEach(element => {
        element.addEventListener('click', filterList)
    });
}


async function loadData()
{
  let response = await fetch('https://foobardata.herokuapp.com');
  let data = await response.json()
  handleData(data)
}

function handleData(data){

    const mappedQueue = data.queue.map(setStatus, 'q')
    const mappedServing = data.serving.map(setStatus, 's')
    list.push(...mappedQueue)
    list.push(...mappedServing)

    handleList(list)
    console.log(list.filter(string => string.status === 'Queue').length)
    insertData('queue' , list.filter(string => string.status === 'Queue').length)
    insertData('serving' , list.filter(string => string.status === 'Serving').length)
    insertData('completed' , list.filter(string => string.status === 'Completed').length)

}

function insertData(id, data){
  document.querySelector(`#${id} h2`).textContent = data
}

function setStatus(string, s) {
    s ? string.status = 'Queue' : string.status = 'Serving'
    return string
}

function handleList(list){
    list.sort((a, b) => a.id - b.id)

    list.forEach(createTable)


}

function createTable(item) {
    const copy = document.querySelector('template').content.cloneNode(true)

    copy.querySelector('[data-info=id]').textContent = item.id
    copy.querySelector('[data-info=start-time]').textContent = item.startTime
    item.order.forEach(element=>{
        const li = document.createElement('li')
        li.textContent = element
        copy.querySelector('[data-info=order] ul').appendChild(li)
    })
    copy.querySelector('[data-info=total]').textContent = 20
    copy.querySelector('[data-info=status]').textContent = item.status

    document.querySelector('.section-table tbody').appendChild(copy)
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase()
}

function filterList (event) {
    event.preventDefault()
    let filteredList = []
    document.querySelectorAll('button').forEach(e=>{
      e.style.background = 'rgb(22, 56, 207)';
    })
    event.target.style.background = 'red'
    const filterBy = event.target.dataset.filter

    if (filterBy == '*') {
        filteredList = list
    } else {

        filteredList = list.filter(string=>string.status==filterBy)
    }
    document.querySelector('.section-table tbody').innerHTML = ''
    handleList(filteredList)
}

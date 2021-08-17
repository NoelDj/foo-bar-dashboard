"use strict"

import '../css/main.scss'
import '@fortawesome/fontawesome-free/js/all.min.js'

const list = [{
  "id": 1,
  "startTime": 1622291201602,
  "price": 80,
  "order": [
    "El Hefe",
    "Hollaback Lager",
    "Sleighride",
    "Steampunk"
  ],
  "status": 'Completed'
}, {
  "id": 3,
  "startTime": 1622291321602,
  "price": 120,
  "order": [
    "El Hefe",
    "Hollaback Lager",
    "Sleighride",
    "Steampunk"
  ],
  "status": 'Completed'
}, {
  "id": 5,
  "startTime": 1622291741602,
  "price": 180,
  "order": [
    "El Hefe",
    "Hollaback Lager",
    "Sleighride",
    "Steampunk"
  ],
  "status": 'Completed'
}]

const settings = {
  sortBy: 'id',
  sortDirection: 'asc',
}

window.addEventListener('DOMContentLoaded', init)

function init() {



  selectButtons()
  loadData()
}

function selectButtons() {
  document.querySelectorAll('button').forEach(element => {
    element.addEventListener('click', filterList)
  });
  document.querySelectorAll('[data-action=sort]').forEach(button => {
    console.log(2222)
    button.addEventListener('click', selectSort)
  })
}


async function loadData() {
  let response = await fetch('https://foobardata.herokuapp.com');
  let data = await response.json()
  handleData(data)
}



function handleData(data) {

  const mappedQueue = data.queue.map(setStatus, 'q')
  const mappedServing = data.serving.map(setStatus, 's')
  list.push(...mappedQueue)
  list.push(...mappedServing)

  handleList(list)
  console.log(list.filter(string => string.status === 'Queue').length)
  insertData('queue', list.filter(string => string.status === 'Queue').length)
  insertData('serving', list.filter(string => string.status === 'Serving').length)
  insertData('completed', list.filter(string => string.status === 'Completed').length)

}


function selectSort(event) {



  const sortDirection = event.target.dataset.sortDirection;
  const sortBy = event.target.dataset.sort;
  console.log(sortBy)

  const old = document.querySelector(`[data-sort='${settings.sortBy}']`)

  old.classList.remove('chosen')
  event.target.classList.add('chosen')


  if (sortDirection === 'asc') {
    event.target.dataset.sortDirection = 'desc'
  } else {
    event.target.dataset.sortDirection = 'asc'
  }

  setSort(sortBy, sortDirection)

}

function setSort(sortBy, sortDirection) {
  settings.sortBy = sortBy
  settings.sortDirection = sortDirection
  document.querySelector('tbody').innerHTML = ''
  handleList(list)
}

function sortList(list) {

  let direction = 1

  if (settings.sortDirection === 'desc') {
    direction = -1
  } else {
    direction = 1
  }

  const sortedList = list.sort(sortProperty)
  console.log(settings.sortBy)
  function sortProperty(a, b) {
    if (a[settings.sortBy] < b[settings.sortBy]) {
      return -1 * direction
    } else {
      return 1 * direction
    }
  }

  console.log(sortedList)

  return sortedList

}

function sortLoadedList(a, b) {

  if (a.id > b.id) {
    return 1
  }
  if (b.id> a.id) {
    return -1
  } else {
    return 0
  }

}

function insertData(id, data) {
  document.querySelector(`#${id} h2`).textContent = data
}

function setStatus(string, s) {
  const randomPrices = [20,25,30,35,40,45,50]
  const price = randomPrices[Math.floor(Math.random()*randomPrices.length)]
  string.price = string.order.length * price
  s ? string.status = 'Queue' : string.status = 'Serving'
  console.log(string)
  return string
}

function handleList(currentList) {
  const sortedList = sortList(currentList)
  console.log(sortedList)
  sortedList.forEach(createTable)


}

function createTable(item) {
  const copy = document.querySelector('template').content.cloneNode(true)

  copy.querySelector('[data-info=id]').textContent = item.id
  copy.querySelector('[data-info=start-time]').textContent = getTime(item.startTime)
  item.order.forEach(element => {
    const li = document.createElement('li')
    li.textContent = element
    copy.querySelector('[data-info=order] ul').appendChild(li)
  })
  console.log(item.price)
  copy.querySelector('[data-info=total]').textContent = item.price

  const statusElement = copy.querySelector('[data-info=status] span')

  statusElement.textContent = item.status

  switch (item.status) {
    case 'Completed':
      statusElement.style.background = 'rgb(35, 174, 137)'
      break;
    case 'Queue':
      statusElement.style.background = 'rgb(249, 142, 51)'
  }

  document.querySelector('.section-table tbody').appendChild(copy)
}

function getTime(time) {
  const currentTime = new Date(time)

  const hours = currentTime.getHours()
  let minutes = currentTime.getMinutes()
  minutes = minutes > 9 ? minutes : '0' + minutes;
  const seconds = currentTime.getSeconds()

  const formatted = `${hours}:${minutes}:${seconds}`

  return formatted
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase()
}

function filterList(event) {
  event.preventDefault()
  let filteredList = []
  document.querySelectorAll('button').forEach(e => {
    e.style.background = '#1C7EBB';
  })
  event.target.style.background = 'red'
  const filterBy = event.target.dataset.filter

  if (filterBy == '*') {
    filteredList = list
  } else {

    filteredList = list.filter(string => string.status == filterBy)
  }
  document.querySelector('.section-table tbody').innerHTML = ''
  handleList(filteredList)
}

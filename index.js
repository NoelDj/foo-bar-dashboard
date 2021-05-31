import './main.scss'

window.addEventListener('DOMContentLoaded', init)

function init() {
    loadData()
}
/* Do not uncomment this
setInterval(() => {
    document.querySelector('.tap-information').innerHTML = ''
    document.querySelector('#storage').innerHTML = ''
    document.querySelector('tbody').innerHTML = ''
    loadData()
}, 1000); */

async function loadData()
{
  let response = await fetch('https://foobardata.herokuapp.com');
  let data = await response.json()
  handleData(data)
}

function handleData(data){
    console.log(data)

    data.bartenders.forEach(appendTable)
    data.storage.forEach(appendList)
    data.taps.forEach(appendTapList)
    insertData('current-orders' , data.queue.length)
    insertData('staff' , data.bartenders.length)
    console.log(data.taps)
    insertData('closing-time', getTap(data.taps))
    insertStock('stock', getStock(data.storage))
    console.log(getStock(data.storage))
}

function appendTapList (item) {
    const copy = document.querySelector('#taps template').content.cloneNode(true)
    console.log(copy)
    console.log(item)
    copy.querySelector('.tap-name').textContent = `${item.id+1}: ${item.beer}`
    const percent = Math.floor(item.level / item.capacity * 100)
    copy.querySelector('.tap-percent').textContent =  percent + '%'
    copy.querySelector('.progress').style.width = percent + '%'
    if(percent < 20) {
        console.log(percent)
        copy.querySelector('.progress').style.background = 'red'
    }

    document.querySelector('.tap-information').appendChild(copy)
}

function appendTable(person) {
    const copy = document.querySelector('#employees').content.cloneNode(true)
    console.log(copy)

    copy.querySelector('[data-info=name]').textContent = capitalize(person.name)
    copy.querySelector('[data-info=status]').textContent = capitalize(person.status)
    copy.querySelector('[data-info=serving]').textContent = person.servingCustomer
    copy.querySelector('[data-info=status-detail]').textContent = person.statusDetail
    copy.querySelector('[data-info=using-tap]').textContent = person.usingTap ?  person.usingTap : 'NA'

    document.querySelector('.section-table tbody').appendChild(copy)
}

function appendList(item) {
    const li = document.createElement('li')
    li.textContent = `${item.name} (${item.amount})`
    console.log(li)
    item.amount <= 2 ? li.style.color = 'red' : li
    document.querySelector('#storage').appendChild(li)
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase()
}

function getStock(data){
    return data.filter(string=>string.amount <= 2).length
}

function getTap(data){
    return data.filter(string=>string.level <= 600).length
}

function insertData(id, data){
    document.querySelector(`#${id} h2`).textContent = data
}

function insertStock(id, data){
    if(data){
        document.querySelector(`#${id} h2`).textContent = data
    } else {
        document.querySelector(`#${id} h2`).textContent = 'No Items'
        document.querySelector(`#${id} h2`).style.color = 'green'
    }
}

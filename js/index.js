"use strict"

import '../css/main.scss'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import Chart from 'chart.js/auto'
import '@fortawesome/fontawesome-free/js/all.min.js'


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

    createLists(data)

    insertData('current-orders' , data.queue.length)
    insertData('staff' , data.bartenders.length)
    insertData('low-taps', getTap(data.taps))
    insertStock('stock', getStock(data.storage))



    switch(data.queue.length) {
        case 1:
            showNotification('There is 1 order')
          break;
        case 0:
            showNotification(`The are no orders`)
          break;
        default:
            showNotification(`There are ${data.queue.length} orders`)
    }

    switch(data.bartenders.length) {
        case 1:
            showNotification('There is 1 employee at work')
          break;
        case 0:
            showNotification(`There is no one at work`)
          break;
        default:
            showNotification(`There are ${data.bartenders.length} eomployees at work`)
    }

}

function createLists(data){

    const sorted = data.bartenders.sort((a, b) =>  a.name < b.name ? -1 : 1)
    sorted.forEach(appendTable)

    createStockChart(data.storage)

    data.taps.forEach(appendTapList)
}

function showNotification(message) {
    Toastify({
        text: message,
        duration: 5000,
        destination: "orders.html",
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        stopOnFocus: true,
        onClick: function(){} // Callback after click
      }).showToast();

}

function appendTapList (item) {
    const copy = document.querySelector('#taps template').content.cloneNode(true)

    copy.querySelector('.tap-name').textContent = `${item.id+1}: ${item.beer}`
    const percent = Math.floor(item.level / item.capacity * 100)
    copy.querySelector('.tap-percent').textContent =  percent + '%'
    copy.querySelector('.progress').style.width = percent + '%'
    if(percent < 20) {
        copy.querySelector('.progress').style.background = 'red'
    }

    document.querySelector('.tap-information').appendChild(copy)
}
function appendTable(person) {
    const copy = document.querySelector('#employees').content.cloneNode(true)

    copy.querySelector('[data-info=name]').textContent = capitalize(person.name)
    copy.querySelector('[data-info=status]').textContent = capitalize(person.status)
    copy.querySelector('[data-info=serving]').textContent = person.servingCustomer ?  'ID: ' + person.servingCustomer : 'NA'
    console.log(person.statusDetail)
    let status = "";
    if (person.statusDetail === "pourBeer"){
        status = "Pouring beer"
    } else if(person.statusDetail === "releaseTap"){
        status = "Reserving tap"
    } else if(person.statusDetail === "replaceKeg"){
        status = "Replacing keg"
    } else if(person.statusDetail === "receivePayment") {
        status = "Receiving payment"
    } else if(person.statusDetail === "startServing") {
        status = "Starting serving"
    }

    console.log(status)
    copy.querySelector('[data-info=status-detail]').textContent = status
    copy.querySelector('[data-info=using-tap]').textContent = person.usingTap ?  person.usingTap : 'NA'

    document.querySelector('#staff tbody').appendChild(copy)
}

function createStockChart(information) {

    const amount = information.map(number=>number.amount)

    const names = information.map(string=>string.name)

    const labels = names

    const data = {
        labels: labels,
        datasets: [{
            label: 'Amount',
            backgroundColor: '#1C7EBB',
            borderColor: 'white',
            data: amount,
        }]
    };

    const config = {
        type: 'bar',
        data,
        options: {

            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 0
                        }
                    }
                }
            }
        }

    }
    var myChart = new Chart(
        document.getElementById('stock-chart'),
        config
    )

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
        document.querySelector(`#${id} h2`).style.color = 'rgb(240, 89, 89)'
    }
}

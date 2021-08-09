"use strict"

import '../css/main.scss'
import '@fortawesome/fontawesome-free/js/all.min.js'

const userName = 'admin'
const passWord = 1234

window.addEventListener('DOMContentLoaded', init)

function init() {

    setTimeout(function(){
        alert(`Username: ${userName} \r\nPassword: ${passWord}`);
    }, 100)

    document.querySelector("form").addEventListener('submit', (e)=>{
        e.preventDefault()
        const checkPassword = check(document.querySelector("#password"), passWord)
        const checkUsername = check(document.querySelector("#username"), userName)
        if( checkUsername && checkPassword) {
            window.location.href = "index.html";
        }
    })
}

function check(field,key) {
    console.log(field)
    if(field.value != key ){
        field.nextElementSibling.textContent = 'Wrong ' + field.id
        return false
    }
    else {
        return true
    }
}

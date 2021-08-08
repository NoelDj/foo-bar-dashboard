"use strict"

let toggle = false;

        document.querySelector('aside').addEventListener('mouseenter', (e) => {

            document.querySelector('aside').classList.add('active')
            toggle = true;
            toggleAside()

        })

        document.querySelector('.logo .icon').addEventListener('click', (e) => {

            const nameOfClass = document.querySelector('aside').className

            /* check if active */

            if(nameOfClass==='active'){
                document.querySelector('aside').classList.remove('active')
            } else {
                document.querySelector('aside').classList.add('active')
            }

            toggle = !toggle;
            toggleAside()

        })

        document.querySelector('aside').addEventListener('mouseleave', (e) => {

            toggle = false;
            document.querySelector('aside').classList.remove('active')
            toggleAside()

        })

        function toggleAside() {

            if (toggle) {
                document.querySelectorAll('.box a').forEach(e => {
                    e.style.opacity = 1;
                })
            } else {
                document.querySelectorAll('.box a').forEach(e => {
                    e.style.opacity = 0;
                })

            }

        }

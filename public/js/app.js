console.log('Client side js file is loaded.')

// fetch data from the url, and 'then' run this function
// fetch('http://localhost:3000/weather?address=').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         }
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (event) => {
    // prevent default refresh
    event.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
            console.log(data)
        })
    })
})
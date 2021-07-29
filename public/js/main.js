const daysEl = document.querySelector('#days')
const loadingEl = document.querySelector('#loading')
let loading = false

const getDaysFromBackend = async() => {
    loading = true
    const res = await fetch('http://localhost:5000/days')
    const data = await res.json()
    loading = false
    return data
}

const addDaysToDom = async() => {
    const days = await getDaysFromBackend()

    if (!loading) {
        loadingEl.innerHTML = ''
    }

    days.forEach((day) => {
        const div = document.createElement('div')
        div.className = 'days'
        div.innerHTML = `
      <h3>${day.title}</h3>
      <ul>
        <li><strong>Release Date: </strong> ${day.date}</li>
        <li><strong>Description: </strong> ${day.Additional}</li>
      </ul>
   
    `
        daysEl.appendChild(div)
    })
}

addDaysToDom()
((window, document) => {
  const API_URL = '/'
  const tbody = document.getElementsByTagName('tbody')[0]
  let configurations = null

  const copy = (event) => {
    console.log(event.target.getAttribute('item'))
    alert('copied!')
  }

  fetch(`${API_URL}all`)
    .then(response => response.json())
    .then(data => {
      if(data.data.length > 0){
        configurations = data.data
        data.data.forEach(item => {
          const tr = document.createElement('tr')
          Object.getOwnPropertyNames(item).forEach(prop => {
            if(prop != '_id' && prop != 'value'){
              const td = document.createElement('td')
              td.innerText = item[prop]
              tr.appendChild(td)
            }
          })

          const tdValue = document.createElement('td')
          tdValue.innerText = '****'
          tr.appendChild(tdValue)

          const tdCopy = document.createElement('td')
          tdCopy.classList.add('g-copy')
          tdCopy.setAttribute('item', item._id)
          tdCopy.innerText = 'copy'
          tdCopy.addEventListener('click', copy)
          tr.appendChild(tdCopy)

          tbody.appendChild(tr)
        })
      }
    })
})(window, document)

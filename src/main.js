import './style.css'
import { copy } from '@geduramc/copy-clipboard-element'

const API_URL = 'https://api.geduramc.com/config-manager/'
const HIDDEN_VALUE = '********'
const IGNORE_COLUMNS = ['_id', 'value', 'expiration', 'key']

const tbody = document.getElementsByTagName('tbody')[0]

const viewValue = ({ el, callback = null }) => {
  el.style.cursor = 'pointer'

  el.addEventListener('mouseover', () => {
    el.style.textDecoration = 'underline'
  })

  el.addEventListener('mouseleave', () => {
    el.style.textDecoration = 'none'
  })

  el.addEventListener('click', () => {
    if (callback != null && typeof callback === 'function') callback(el)
  })
}

const openDialog = ({ textContent }) => {
  const overlay = document.createElement('div')
  overlay.classList.add('overlay')

  const dialog = document.createElement('dialog')
  dialog.style.display = 'block'

  const content = document.createElement('p')
  content.innerText = textContent
  content.style.overflowY = 'auto'
  content.style.height = 'auto'
  content.style.maxHeight = '200px'
  content.style.fontSize = '14px'

  const close = document.createElement('label')
  close.classList.add('close-dialog')
  close.innerText = 'close'

  dialog.appendChild(content)
  dialog.appendChild(close)
  overlay.appendChild(dialog)
  document.body.appendChild(overlay)

  close.addEventListener('click', () => {
    overlay.remove()
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (dialog.style.display === 'block') overlay.remove()
    }
  })
}

fetch(`${API_URL}all`)
  .then(response => response.json())
  .then(data => {
    if (data.data.length > 0) {
      data.data.forEach(item => {
        const tr = document.createElement('tr')
        Object.getOwnPropertyNames(item).forEach(prop => {
          if (!IGNORE_COLUMNS.find(x => x === prop)) {
            const td = document.createElement('td')
            td.innerText = item[prop]
            tr.appendChild(td)
          }
        })

        const tdValue = document.createElement('td')
        tdValue.innerText = HIDDEN_VALUE
        tr.appendChild(tdValue)
        viewValue({
          el: tdValue,
          callback: (el) => {
            openDialog({
              textContent: item.value
            })
          }
        })

        const tdCopy = document.createElement('td')
        const copyElement = document.createElement('copy-clipboard')
        copyElement.setAttribute('icon-theme', 'dark')
        copyElement.setAttribute('tooltip-position', 'right')

        copyElement.addEventListener('click', () => {
          copy(item.value)
        })

        tdCopy.appendChild(copyElement)
        tr.appendChild(tdCopy)

        tbody.appendChild(tr)
      })
    }
  })

import './style.css'

const API_URL = 'http://localhost:3000/'
const HIDDEN_VALUE = '********'
const IGNORE_COLUMNS = ['_id', 'value', 'expiration', 'key']

const tbody = document.getElementsByTagName('tbody')[0]

const setCopy = ({ el, tooltipText = 'Copied!', callback = null }) => {
  el.setAttribute('title', 'Copy to Clipboard')
  el.style.cursor = 'pointer'
  el.style.display = 'grid'
  el.style.gridTemplateColumns = 'repeat(1, 1fr)'
  el.style.placeItems = 'center'

  const img = document.createElement('img')
  img.style.width = '15px'
  img.style.margin = '2px'
  img.setAttribute('src', "data:image/svg+xml,%3Csvg viewBox='0 0 600 600' version='1.1' id='svg9724' sodipodi:docname='copy.svg' inkscape:version='1.2.2 (1:1.2.2%2B202212051550%2Bb0a8486541)' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns='http://www.w3.org/2000/svg' xmlns:svg='http://www.w3.org/2000/svg' fill='%23FFF' stroke='%23FFF'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cdefs id='defs9728'%3E%3C/defs%3E%3Csodipodi:namedview id='namedview9726' pagecolor='%23ffffff' bordercolor='%23666666' borderopacity='1.0' inkscape:showpageshadow='2' inkscape:pageopacity='0.0' inkscape:pagecheckerboard='0' inkscape:deskcolor='%23d1d1d1' showgrid='true' inkscape:zoom='0.84118632' inkscape:cx='201.50114' inkscape:cy='246.67543' inkscape:window-width='1920' inkscape:window-height='1009' inkscape:window-x='0' inkscape:window-y='1080' inkscape:window-maximized='1' inkscape:current-layer='svg9724' showguides='true'%3E%3Cinkscape:grid type='xygrid' id='grid9972' originx='0' originy='0'%3E%3C/inkscape:grid%3E%3Csodipodi:guide position='-260 300' orientation='0 -1' id='guide383' inkscape:locked='false'%3E%3C/sodipodi:guide%3E%3Csodipodi:guide position='300 520' orientation='1 0' id='guide385' inkscape:locked='false'%3E%3C/sodipodi:guide%3E%3Csodipodi:guide position='240 520' orientation='0 -1' id='guide939' inkscape:locked='false'%3E%3C/sodipodi:guide%3E%3Csodipodi:guide position='220 80' orientation='0 -1' id='guide941' inkscape:locked='false'%3E%3C/sodipodi:guide%3E%3Csodipodi:guide position='470 130' orientation='-0.70710678 -0.70710678' id='guide960' inkscape:locked='false'%3E%3C/sodipodi:guide%3E%3Csodipodi:guide position='210 210' orientation='0.70710678 -0.70710678' id='guide962' inkscape:locked='false'%3E%3C/sodipodi:guide%3E%3C/sodipodi:namedview%3E%3Cpath style='color:%23FFFFFFFF%3Bfill:%23FFFFFF%3Bstroke-width:1%3Bstroke-linecap:round%3Bstroke-linejoin:round%3B-inkscape-stroke:none%3Bpaint-order:stroke fill markers' d='M 39.2 110 A 39.20392 39.20392 0 0 0 0 149.2 V 560.8 A 39.20392 39.20392 0 0 0 39.2 600 h 325.13031 a 39.20392 39.20392 0 0 0 39.2 -39.2 V 149.2 a 39.20392 39.20392 0 0 0 -39.2 -39.2 z m 39.2 78.4 H 325.13031 V 521.6 H 78.4 Z' id='rect347-7'%3E%3C/path%3E%3Cpath style='color:%23FFFFFFFF%3Bfill:%23FFFFFF%3Bstroke-width:1%3Bstroke-linecap:round%3Bstroke-linejoin:round%3B-inkscape-stroke:none%3Bpaint-order:stroke fill markers' d='m 235.66969 0 a 39.20392 39.20392 0 0 0 -39.2 39.2 V 98 h 78.4 V 78.4 H 521.6 V 411.6 H 415.53031 V 490 H 560.8 A 39.20392 39.20392 0 0 0 600 450.8 V 39.2 A 39.20392 39.20392 0 0 0 560.8 0 Z' id='rect347-6'%3E%3C/path%3E%3C/g%3E%3C/svg%3E")

  const small = document.createElement('small')
  small.innerText = 'copy'
  small.style.fontSize = '10px'

  const tooltip = document.createElement('span')
  tooltip.innerText = tooltipText
  tooltip.style.width = 'auto'
  tooltip.style.backgroundColor = '#000'
  tooltip.style.color = '#FFF'
  tooltip.style.textAlign = 'center'
  tooltip.style.borderRadius = '6px'
  tooltip.style.padding = '2px 4px'
  tooltip.style.position = 'absolute'
  tooltip.style.zIndex = '1'
  tooltip.style.fontSize = '10px'
  tooltip.style.marginLeft = '6rem'
  tooltip.style.display = 'none'

  el.appendChild(img)
  el.appendChild(small)
  el.appendChild(tooltip)

  el.addEventListener('mouseover', () => {
    el.style.opacity = '.5'
  })

  el.addEventListener('mouseleave', () => {
    el.style.opacity = '1'
  })

  el.addEventListener('click', () => {
    if (callback != null && typeof callback === 'function') callback(el)
    tooltip.style.display = 'block'

    setTimeout(() => {
      tooltip.style.display = 'none'
    }, 1000)
  })

  return el
}

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

const copyToClipBoard = async ({ text }) => {
  if (!navigator.clipboard) {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.position = 'fixed'

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    document.execCommand('copy')
    textArea.remove()
  } else await navigator.clipboard.writeText(text)
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
        const copy = setCopy({
          el: document.createElement('span'),
          callback: () => {
            copyToClipBoard({
              text: item.value
            })
          }
        })

        copy.setAttribute('item', item._id)

        tdCopy.appendChild(copy)
        tr.appendChild(tdCopy)

        tbody.appendChild(tr)
      })
    }
  })

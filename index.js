const electron = require('electron')
const windows = []

const style = `
  html, body {
    font-size: 18px !important;
    color: tomato !important;
    background-color: rebeccapurple;
  }

  svg { width: 1rem; }

  h1 {
    font-size: 8rem !important;
  }
`

electron.app.on('ready', () => {
  const screen = electron.screen
  const size = screen.getPrimaryDisplay().workAreaSize

  let win = new electron.BrowserWindow({
    title: 'Papyrus',
    width: size.width/2,
    height: size.height/2
  })

  win.loadURL('http://mrmrs.cc')

  const js = `
    // http://stackoverflow.com/questions/9252839/simplest-way-to-remove-all-the-styles-in-a-page
    const removeInlineStyles = el => {
      el.removeAttribute('style')

      if(el.childNodes.length > 0) {
        for(let child in el.childNodes) {
          if(el.childNodes[child].nodeType == 1)
            removeInlineStyles(el.childNodes[child])
        }
      }
    }

    removeInlineStyles(document.body)

    const stylesheets = document.getElementsByTagName('style')
    let i = 0

    for (i in stylesheets) {
      let sheet = stylesheets[i]
      sheet.parentNode && sheet.parentNode.removeChild(sheet)
    }

    const links = document.getElementsByTagName('link')

    for (i in links) {
      let link = links[i]
      const type = link.getAttribute && link.getAttribute('rel')

      if (type && type.toLowerCase() === 'stylesheet')
        link.parentNode.removeChild(link)
    }

    const styleTag = document.createElement('style')
    styleTag.textContent = "${style.replace(/\n/g, '')}"
    document.body.appendChild(styleTag)
  `

  win.webContents.executeJavaScript(js)
  
  win.on('closed', () => {
    const i = windows.indexOf(win)
    if (i !== -1) windows.splice(i, 1)
    win = null
  })

  windows.push(win)
})

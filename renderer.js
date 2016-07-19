const electron = require('electron')
const yo = require('yo-yo')

const isBlank = require('is-blank')
const normalizeUrl = require('normalize-url')

const css = require('./css')
const stripCss = require('./strip-css')

const style = css()

module.exports = () => {
  window.tabs = []

  electron.ipcRenderer.on('appmenu', (ev, type) => {
    let tab = showCmd()

    tab.addEventListener('keyup', ev => {
      if (ev.keyCode === 13) {
        console.log(tab.value)
        if (/^\:go/.test(tab.value)) {
          const url = normalizeUrl(tab.value.replace(/:go /, ''))
          tabs.push(url)
          setTab(url, tab)
        } else if (/^\:ls/.test(tab.value)) {
          showLs()
        } else if (/^\:gh/.test(tab.value)) {
          let url = tab.value.replace(/^\:gh/, '')
          url = isBlank(url) ? 'github.com' : `github.com/${url.trim()}`
          url = normalizeUrl(url)
          tabs.push(url)
          setTab(url, tab)
        } else if (/^\:npm/.test(tab.value)) {
          let url = tab.value.replace(/^\:npm/, '')
          url = isBlank(url) ? 'npmjs.com' : `npmjs.com/${url.trim()}`
          url = normalizeUrl(url)
          tabs.push(url)
          setTab(url, tab)
        } else if (/^\:hn/.test(tab.value)) {
          let url = 'news.ycombinator.com'
          url = normalizeUrl(url)
          tabs.push(url)
          setTab(url, tab)
        } else if (/^\:g /.test(tab.value)) {
          let url = `https://google.com/#q=${tab.value.replace(/^\:g /, '')}`
          tabs.push(url)
          setTab(url, tab)
        } else if (/^\:t/.test(tab.value)) {
          let username = tab.value.replace(/^\:t/, '')
          url = isBlank(username) ? 'twitter.com' : `twitter.com/${username.trim()}`
          url = `https://${url}`
          tabs.push(url)
          setTab(url, tab)
        }
      }
    })
  })
}

const setTab = (url, activeTab) => {
  const newTab = yo`<webview class="papyrus-tab" src="${url}" style="height: 100%"></webview>`

  newTab.addEventListener('dom-ready', () => {
    let prev = document.querySelectorAll('.papyrus-tab')
    const papyrusInit = document.getElementById('papyrus-init')
    papyrusInit && papyrusInit.parentNode.removeChild(papyrusInit)
    const papyrusLs = document.getElementById('papyrus-ls')
    papyrusLs && papyrusLs.parentNode.removeChild(papyrusLs)

    if (prev.length > 1) {
      prev = prev[0]
      prev && prev.parentNode.removeChild(prev)
    }

    activeTab && activeTab.parentNode.removeChild(activeTab)
  })

  document.body.appendChild(newTab)
}

const showCmd = () => {
  let tab = yo`
    <input id="cmd"
      style="position: fixed; bottom: 0; left: 0; right: 0; width: 100%; background-color: black; color: white; padding: 1rem;"
      placeholder=":go johno.in"
    />`

  document.body.appendChild(tab)
  tab = document.getElementById('cmd')
  tab.focus()

  return tab
}

const showLs = () => {
  const papyrusLs = document.getElementById('papyrus-ls')
  papyrusLs && papyrusLs.parentNode.removeChild(papyrusLs)

  const ls = yo`
    <div id="papyrus-ls" style="position: absolute; width: 100%; background-color: black; color: white; bottom: 3rem;">
      <ul>
        ${tabs.map(t => yo`<li style="list-style-type: none;" onclick=${e => setTab(t)}>${t}<br></li>`)}
      </li>
    </div>
  `

  document.body.appendChild(ls)

  return ls
}

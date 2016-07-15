module.exports = style => `
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

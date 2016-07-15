const diatonic = require('diatonic')

module.exports = () => `
  html, body {
    margin-top: 20px;
    margin-right: auto;
    margin-left: auto;
    width: 32rem;
    line-height: 1.6;
    font-size: 20px !important;
    font-family: sans-serif;
    color: #444;
    background-color: #fafafa;
  }

  a, a:visited {
    text-decoration: none;
    color: #006C71;
  }

  a:hover, a:active, a:focus { opacity: .9; }

  svg { width: 1rem; }

  h1 { font-size: ${diatonic('fiveLinePica')} !important; }
  h2 { font-size: ${diatonic('doubleGreatPrimer')} !important; }
  h3 { font-size: ${diatonic('doublePica')} !important; }
  h4 { font-size: ${diatonic('doubleSmallPica')} !important; }
  h5 { font-size: ${diatonic('greatPrimer')} !important; }
  h6 { font-size: ${diatonic('smallPica')} !important; }

/*
  FLUIDITY v0.1.0
  @mrmrs - http://mrmrs.cc
  MIT
*/
/*
  Responsive Utilities
*/
img, canvas, iframe, video, svg, select, textarea {
  max-width: 100%; }

/* Wrap tables or pre elements in a div with this class */
.overflow-container {
  overflow-x: scroll; }

/*
  Aspect ratios for media objects i.e canvas, iframe, video, svg etc.
  Defaults to 16x9
*/
.aspect-ratio {
  height: 0;
  padding-top: 56.25%;
  position: relative; }

.aspect-ratio--object {
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100; }
`

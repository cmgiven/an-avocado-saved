walk(document.body)

new MutationObserver(function (mutations) {
    if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
        walk(document.body)
    }
}).observe(document.body, { childList: true, subtree: true })

function walk(node) {
    // I stole this function from here:
    // http://is.gd/mwZp7E
    
    var child, next

    switch ( node.nodeType ) {
        case 1:  // Element
        case 9:  // Document
        case 11: // Document fragment
            child = node.firstChild
            while ( child ) {
                next = child.nextSibling
                walk(child)
                child = next
            }
            break

        case 3: // Text node
            handleText(node)
            break
    }
}

function handleText(textNode) {
    var AVOCADO_PRICE = 1.27
    var AVOCADOS_PER_YEAR = 4250000000

    var txt = textNode.nodeValue

    var matches = txt.match(/\$(?:\d{1,3},?)*\d{1,3}(?:\.\d{1,2})?/g)

    if (matches) {
        matches.forEach(function (dollarStr) {
            var dollars = parseFloat(dollarStr.substring(1).replace(/,/g,''))
            var avocados = dollars / AVOCADO_PRICE
            var avocadoStr

            if (avocados > AVOCADOS_PER_YEAR * 1.1) {
                avocadoStr = (avocados / AVOCADOS_PER_YEAR).toFixed(1) + " times the annual consumption of Hass avocados in the United States"
            } else {
                avocadoStr = Math.round(avocados).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                avocadoStr += (avocadoStr === 1 ? ' avocado' : ' avocados')
            }
            txt = txt.replace(dollarStr, avocadoStr)
        })
    }
    
    textNode.nodeValue = txt
}

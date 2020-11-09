let sources = {
    'default-src': ['\'self\''],
    'script-src': ['\'self\'', '\'unsafe-inline\''],
    'frame-src': ['\'self\''],
    'img-src': ['\'self\'', 'https:', 'data:'],
    'style-src': ['\'self\'', 'https:', '\'unsafe-inline\''],
    'font-src': ['\'self\'', 'https:'],
    'connect-src': ['\'self\''],
}

let csp = Object.keys(sources).map(function (key) {
    return `${key} ${sources[key].join(' ')};`
})

export default function CSP(req, res, next) {
    res.setHeader('Content-Security-Policy', csp.join(' '))
    next()
}
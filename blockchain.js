const crypto = require('crypto')

function generateHash(data, previousHash = '') {
    const content = JSON.stringify(data) + previousHash
    return crypto.createHash('sha256').update(content).digest('hex')
}

module.exports = { generateHash }
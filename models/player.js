let Player = class {
    constructor(username, opponentSocket, symbol, socket) {
        this.username = username
        this.opponentSocket = opponentSocket
        this.symbol = symbol
        this.socket = socket
    }
    getOpponentSocket() {
        return this.opponentSocket
    }
    setOpponentSocket(opponentSocket) {
        this.opponentSocket = opponentSocket
    }    
}

module.exports = {Player};
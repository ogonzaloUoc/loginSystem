let Room = class {
    constructor(name) {
        this.name = name,
        this.players = {}
    }
    addPlayer(player) {
        this.players[player.socket.id] = player
    }
    numberOfPlayers() {
        return this.players.length
    }
}

module.exports = {Room};
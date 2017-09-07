class Cell 
{
  constructor(i, j, game) {
    this.x = i
    this.y = j
    this.game = game
    this.element = document.createElement('td')

    this.flagged = false

    this.element.addEventListener( 'contextmenu', e => this.rightClick(e) , {
      capture: true
    })
  }

  rightClick(event) {
    event.preventDefault()
    // Break early if revealed
    if (this.isShown) { return; }
    if (this.flagged) {
      this.flagged = false
      this.element.innerHTML = ''
      this.game.found(-1)
    } else {
      this.flagged = true
      this.element.innerHTML = this.flag
      this.game.found(1)
    }
  }

  get flag() {
    return String.fromCodePoint('128681')
  }
}
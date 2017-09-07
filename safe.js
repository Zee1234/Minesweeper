class SafeCell extends Cell
{
  constructor(x, y, game) {
    super(x, y, game)
    this.bomb = false

    this.element.addEventListener('click', _ => this.show())

    this.bombNeighbors = 0
    this.populateNeighbors()

    this.isShown = false
    this.isBomb = false
  }
  
  get inner() {
    return this.bombNeighbors ? this.bombNeighbors : ''
  }

  populateNeighbors() {
    this.neighbors = []
    for ( let x = this.x-1; x <= this.x+1; x++) {
      if (x >= 0 && x < this.game.width) {
        for ( let y = this.y-1; y <= this.y+1; y++) {
          if (y >= 0 && y < this.game.height) {
            this.neighbors.push([x, y])
          }
        }
      }
    }
    this.neighbors.forEach( pair => {
      let [x, y] = pair
      let val = this.game.matrix(x,y)
      if (val && val.isBomb) {
        ++this.bombNeighbors
      }
    })
  }


  // Differentiate between clicked and revealed
  show() {
    // Break early if flagged
    if (this.flagged) { return; }
    // Break early if already revealed
    // Prevents extra clicks from retriggering events
    if (this.isShown) { return; }
    this.isShown = true
    // Do we have bomb neighbors?
    if (this.bombNeighbors) {
      this.element.innerHTML = this.inner
      this.element.classList.add('revealed')
    } else {
      this.neighbors.forEach( pair => {
        let [x, y] = pair
        this.game.matrix(x,y).reveal() 
      })
      this.element.classList.add('revealed')
    }
    this.game.checkWin()
  }

  reveal() {
    // Break early if flagged
    if (this.flagged) { return; }
    // Break early if already revealed
    // Prevents infinite loops
    if (this.isShown) { return; }
    this.isShown = true
    // Do we have bomb neighbors?
    if (this.bombNeighbors) {
      this.element.innerHTML = this.inner
      this.element.classList.add('revealed')
    } else {
      // Reveal all bombless neighbors
      this.neighbors.forEach( pair => {
        let [x, y] = pair
        this.game.matrix(x,y).reveal() 
      })
      this.element.classList.add('revealed')
    }
  }
}

class Minesweeper 
{
  constructor(width, height, bombs, container) {
    if (bombs > width*height)
      bombs = width*height-1
    this.width = width
    this.height = height
    this.bombs = bombs
    this.DOM = {}
    this.DOM.container = container
  }

  // Create game board
  populate() {
    // Clear play space
    this.DOM.full = 
      document.getElementById('gameTemplate').content.cloneNode(true)
    this.DOM.table = this.DOM.full.querySelector('table')
    this.DOM.bombs = this.DOM.full.querySelector('.bombs')
    this.DOM.flags = this.DOM.full.querySelector('.flags')
    this.DOM.timer = this.DOM.full.querySelector('.timer')
    this.DOM.container.innerHTML = ''
    this.DOM.container.appendChild(this.DOM.full)

    this.DOM.timer.count = 0
    this.DOM.timer.innerHTML = this.DOM.timer.count
    this.DOM.bombs.innerHTML = this.bombs
    this.DOM.flags.flags = 0
    this.DOM.flags.innerHTML = this.DOM.flags.flags

    let tableClick = (e) => {
      this.timerInterval = setInterval( _ => {
        this.DOM.timer.count++
        this.DOM.timer.innerHTML = this.DOM.timer.count
      }, 1000)
      this.DOM.table.removeEventListener('click', tableClick)
    }
    this.DOM.table.addEventListener('click', tableClick)

    // Setup matrix
    this._matrix = []
    for (let i = 0; i < this.height; i++) {
      this._matrix[i] = []
      for (let j = 0; j < this.width; j++) {
        this._matrix[i][j] = false
      }
    }
    console.log('Matrix Created')

    // Generate bombs at random locations
    let count = 0
    while (count < this.bombs) {
      let x = random(this.width)
      let y = random(this.height)
      if (!this.matrix(x, y)) {
        this.setMatrix(x, y, new BombCell(x, y, this))
        count++
      }
    }
    console.log('Bombs populated')

    // Fill rest of cells
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (!this.matrix(x, y)) {
          this.setMatrix(x, y, new SafeCell(x, y, this))
        }
      }
    }
    console.log('Safe cells populated')
    console.log(this._matrix)

    // Create game board
    for (let i = this._matrix.length-1; i >= 0; i--) {
      let tr = document.createElement('tr')
      for (let j = 0; j < this._matrix[i].length; j++) {
        tr.appendChild(this.matrix(j,i).element)
      }
      this.DOM.table.appendChild(tr)
    }
  }

  // Logical access of the matrix
  matrix(x, y) {
    return this._matrix[y][x]
  }

  // Logical setting of the matrix
  setMatrix(x, y, value) {
    this._matrix[y][x] = value
  }

  lose() {
    clearInterval(this.timerInterval)
    this._matrix.forEach( arr => {
      arr.forEach( cell => {
        cell.blown = true
        cell.element.innerHTML = cell.inner
        cell.isShown = true
      })
    })
  }

  checkWin() {
    let count = this.bombs
    let total = this.width * this.height
    this._matrix.forEach( row => {
      row.forEach( cell => {
        if (cell.isShown) {
          count++
        }
      })
    })
    if (count === total) {
      clearInterval(this.timerInterval)
      this._matrix.forEach( row => {
        row.forEach( cell => {
          if (cell.isBomb) {
            cell.element.innerHTML = String.fromCodePoint(10004)
          }
        })
      })
    }
  }

  found(num) {
    this.DOM.flags.flags += num
    this.DOM.flags.innerHTML = this.DOM.flags.flags
  }
}

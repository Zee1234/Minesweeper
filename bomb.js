class BombCell extends Cell
{
  constructor(x, y, game) {
    super(x, y, game)

    this.element.addEventListener('click', _ => this.show() )

    this.isBomb = true

    this.blown = false
  }

  get inner() {
    let bomb =  String.fromCodePoint(128163)
    let check = String.fromCodePoint(10004)
    return this.blown ? bomb : check
  }

  show() {
    // Break early if flagged
    if (this.flagged) { return; }
    this.blown = true
    this.element.innerHTML = this.inner
    this.element.classList.add('blown')
    this.game.lose()
  }

  reveal() {}
}

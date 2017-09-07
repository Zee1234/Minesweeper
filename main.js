function sliderSetup(name) {
  let slider = document.getElementById(`${name}-slider`)
  let text = document.getElementById(`${name}-display`)
  slider.addEventListener( 'change', function(event) {
    text.value = event.target.value
  })
  slider.addEventListener( 'input', function(event) {
    text.value = event.target.value
  })
  text.addEventListener( 'blur', function(event) {
    let value = event.target.value
    if (value > slider.max)
      value = slider.max
    if (value < slider.min)
      value = slider.min
    slider.value = value
    event.target.value = value

  })
  text.value = slider.value
  return slider
}

let controls = {
  x: sliderSetup('x'),
  y: sliderSetup('y'),
  bombs: sliderSetup('bombs')
}

function setupGame({ x, y, bombs }, container) {
  return new Minesweeper(x.value, y.value, bombs.value, container)
}

let game

document.getElementById('new-game').addEventListener( 'click', function(event) {
  game = setupGame(controls, document.getElementById('game'))
  game.populate()
})
document.getElementById('new-game').click()
function random(min,max) {
  if (max && min && max < min) {
    let temp = max
    max = min
    min = temp
  }
  if (!max) {
    if (!min) {
      return Math.random()
    } else {
      return Math.floor(Math.random() * min)
    }
  } else {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}
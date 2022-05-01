const array = []
const getPassengerId = (string) => {
  const firstPassengerId = string.slice(0, 24)
  const secondPassengerId = string.slice(25, 49)

  array.push(firstPassengerId)
  array.push(secondPassengerId)
}

module.exports = { getPassengerId }

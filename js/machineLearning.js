function hypothesis(theta, X) {
  return sigmoid(math.multiply(X, theta))
}

function sigmoid(z) {
  return (math.dotDivide(1, math.add(1, math.exp(math.dotMultiply(-1, z)))));
}

function cost(theta, X, y) {
  var y1 = math.dotMultiply(math.dotMultiply(-1, y), math.log(hypothesis(theta, X)))
  var y0 = math.dotMultiply(math.subtract(1, y), math.log(math.subtract(1, hypothesis(theta, X))))
  return math.sum(math.subtract(y1, y0)) / math.size(y);
}

function grad(theta, X, y) {
  return math.dotDivide(math.multiply(math.transpose(X), math.subtract(hypothesis(theta, X), y)), math.size(y)[0])
}

function gradDescent(theta, X, y, alpha) {
  return math.subtract(theta, math.dotMultiply(alpha, grad(theta, X, y)))
}

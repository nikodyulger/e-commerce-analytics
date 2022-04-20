Model = {};

Model.getProducts = function () {
  return $.ajax({ url: '/api/products', method: 'GET' });
}

Model.signin = function (email, password) {
  return $.ajax({
    url: '/api/users/signin',
    method: 'POST',
    data: { email, password }
  });
}

Model.signup = function (name, surname, address, birth, email, password) {
  return $.ajax({
    url: '/api/users/signup',
    method: 'POST',
    data: { name, surname, address, birth, email, password }
  })
}

Model.purchase = function (purchase) {
  return $.ajax({
    url: '/api/orders',
    method: 'POST',
    data: { purchase }
  })
}

Model.getUserId = function () {
  var decoded = decodeURIComponent(document.cookie);
  return decoded.substring(7, decoded.length);
}

Model.signout = function () {
  //Model.user = null;
  document.cookie = 'userid=;expires=0;path=/;'
}

Model.getProfile = function () {
  return $.ajax({ url: '/api/users/profile', method: 'GET' })
}

Model.getUserCartQty = function () {
  return $.ajax({ url: '/api/cart/qty', method: 'GET' })
}

Model.buy = function (pid) {
  return $.ajax({ url: '/api/cart/items/product/' + pid, method: 'POST' })
}

Model.getCart = function () {
  return $.ajax({ url: '/api/cart', method: 'GET' })
}

Model.getOrders = function() {
  return $.ajax({ url: '/api/orders', method: 'GET'})
}

Model.getOrder = function (number) {
  return $.ajax({ url: '/api/orders/id/'  + number, method: 'GET'})
}

Model.removeOne = function (pid) {
  return $.ajax({ url: '/api/cart/items/product/' + pid + '/one', method: 'DELETE' })
}

Model.removeAll = function (pid) {
  return $.ajax({ url: '/api/cart/items/product/' + pid + '/all', method: 'DELETE' })
}
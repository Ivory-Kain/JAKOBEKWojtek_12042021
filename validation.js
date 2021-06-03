var customerOrder = JSON.parse(localStorage.getItem("orderId"));
console.log(customerOrder);
var customerOrderId = customerOrder.orderId
console.log(customerOrderId);
var customerOrderTotal = customerOrder.contact.total
console.log(customerOrderTotal);
var customerOrderTotalModified = customerOrderTotal.substring(0, customerOrderTotal.length - 2) + "." + customerOrderTotal.substring(customerOrderTotal.length - 2, customerOrderTotal.length) + ' €'
document.querySelector(".orderId").textContent = customerOrderId
document.querySelector(".totalPrice").textContent = customerOrderTotalModified
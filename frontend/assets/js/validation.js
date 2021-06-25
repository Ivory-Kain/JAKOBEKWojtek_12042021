// Récupérartion de la réponse au format tableau dans le localStorage
var customerOrder = JSON.parse(localStorage.getItem("orderId"));
console.log("CO", customerOrder);

// Récupérartion de l'Id de la commande
var customerOrderId = customerOrder.orderId
console.log("COI", customerOrderId);

// Récupération du prix total de mla commande
var customerOrderTotal = customerOrder.contact.total
console.log("COT", customerOrderTotal);

// // prix formater " prix en centimes moins 2 caractères, plus "." plus 2 caractères"
var customerOrderTotalModified = customerOrderTotal.substring(0, customerOrderTotal.length - 2) + "." + customerOrderTotal.substring(customerOrderTotal.length - 2, customerOrderTotal.length) + ' €'

// // querySelector "remplissage de la cible par les résultats donné par customerOrderId et customerOrderTotalModified"
document.querySelector(".orderId").textContent = customerOrderId
document.querySelector(".totalPrice").textContent = customerOrderTotalModified
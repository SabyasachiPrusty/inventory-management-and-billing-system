const items = JSON.parse(localStorage.getItem("invoiceItems"))
const table = document.getElementById("invoiceItems")

let total=0

items.forEach(item=>{

let row = table.insertRow()

row.insertCell(0).innerText=item.name
row.insertCell(1).innerText=item.price
row.insertCell(2).innerText=item.qty
row.insertCell(3).innerText=item.total

total+=item.total

})

document.getElementById("total").innerText=total
document.getElementById("date").innerText=new Date().toLocaleDateString()
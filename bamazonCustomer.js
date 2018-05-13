var Table = require("cli-table");
var inquirer = require("inquirer");

function displayItems() {
    var table = new Table({
        head: ['Item #', "Description", "Price", "Stock Left"],
        colWidths: [100, 300, 100, 100]
    }) 
    table.push(1, Something, 9.98, 18);
    console.log(table.toString());
}

displayItems();
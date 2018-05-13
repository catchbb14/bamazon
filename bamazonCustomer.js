var Table = require("cli-table");
var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'bamazon'
});
var availableItems = [];

function refreshDataList() {
    availableItems = [];
    connection.connect();
    
    connection.query('SELECT * FROM products', function (error, results, fields) {
    if (error) throw error;
    displayItems(results);
    });
    connection.end();
}

function promptUser() {
    var availableChoices = [];
    availableItems.forEach( function(item) {
        availableChoices.push({
            name: item.product_name,
            value: item.item_id
        })
    });

    inquirer.prompt([
        {
            type: "list",
            name: "itemChosen",
            message: "What would you like to buy?",
            choices: availableChoices
        }
    ]).then( function(answer) {
        var item_id = answer['itemChosen'];
        console.log(item_id);
    })
}


function displayItems(productList) {
    
    var table = new Table({
        head: ['Item #', "Description", "Department", "Price", "Stock Left"],
        colWidths: [10, 20, 20, 10, 10]
    }); 

    productList.forEach( function(item) {
        table.push([item.item_id, item.product_name, item.department_name, item.price, item.stock_quantity]);
        if(item.stock_quantity > 0) {
            availableItems.push(item);
        }
    })
    
    console.log(`Current Inventory\n${table.toString()}\n`);
    promptUser();
}


refreshDataList();

 

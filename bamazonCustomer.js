var Table = require("cli-table");
var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Edogbb14',
    database : 'bamazon'
});
var availableItems = [];

function refreshTable() {
    availableItems = [];

    
    connection.query('SELECT * FROM products', function (error, results, fields) {
    if (error) throw error;
    displayItems(results);
    });
}

function updateQuantity(id, number, refreshTable) {
    connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [number, id],
    function( error, results) {
        if(error) throw error;
        refreshTable();
        connection.end();
    }
)
}

function getMaxQuantity(id) {
    var max;
    connection.query('SELECT * FROM products WHERE item_id = ?', [id],
            function( error, results, fields) {
                if(error) throw error;
                promptQuantity(results[0]);
            }
    )
}

function promptQuantity(item) {
    var max = item.stock_quantity;
    var price = item.price;
    var item_id = item.item_id;

    inquirer.prompt([
        {
            type: "input",
            name: "quantity",
            message: `How many would you like to buy?`,
            validate: function (input) {
                var done = this.async();
                setTimeout( function() {
                    if( isNaN(input) || parseInt(input) < 1 || parseInt(input) > max) {
                        done(`Please provide a number between 1 and ${max}`);
                        return;
                    }
                    done(null, true);
                }, 1000);
                
            }
        }
    ]).then( function(answer) {
        updateQuantity(item_id, max - answer.quantity, refreshTable);
        console.log(
                `Your transaction is being processed...
                The amount of $${(answer.quantity * price).toFixed(2)}
                has been charged to your account... 
                Thank you for shopping at Bamazon!
                `);
        
    })
}

function promptItem() {
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
        getMaxQuantity(item_id);
    })
}


function displayItems(productList) {
    
    var table = new Table({
        head: ['Item #', "Description", "Department", "Price", "Stock Left"],
        colWidths: [10, 20, 20, 10, 10]
    }); 

    productList.forEach( function(item) {
        table.push([item.item_id, item.product_name, item.department_name, item.price.toFixed(2), item.stock_quantity]);
        if(item.stock_quantity > 0) {
            availableItems.push(item);
        }
    })
    
    console.log(`Current Inventory\n${table.toString()}\n`);
    
}

connection.connect();
refreshTable();
setTimeout( function() {
    promptItem();
},1000);

 

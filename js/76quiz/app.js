(function () {
    'use strict';

    class Item {
        constructor(name, price, quantity) {
            this.name = name;
            this.quantity = quantity;
            this.price = (Math.round((price / this.quantity) * 100) / 100).toFixed(2);
        }
    }

    class Order {
        constructor(customerName, customerAddress, items) {
            this.customerName = customerName;
            this.customerAddress = customerAddress;
            this.items = items;
        }

        get total() {
            return this.total;
        }
    }

    const items = [];
    const orders = [];

    document.getElementById('theButton').addEventListener('click', executeFetch);

    function executeFetch() {
        fetch('orders.json')
            .then(r => {
                if (!r.ok) {
                    throw new Error(r.status, r.statusText);
                }
                return r.json();
            })
            .then(r => {
                handleData(r);
            })
            .catch(err => {
                console.error(err);
            });

        function handleData(data) {
            data.forEach(order => {
                //create an order object
                orders.push(new Order(order.customer, order.address, order.items));
                //create an item object
                order.items.forEach(item => {
                    items.push(new Item(item.item, item.total, item.quantity));
                });
            });

            appendToHtml();
        }
    }

    function appendToHtml() {
        console.log(orders, items);
        for (let i = 0; i < orders.length; i++) {
            // console.log(items);
            const arrayItems = orders[i].items.map(item => item.item);
            const stringItems = [...arrayItems].toString();
            // console.log('string items', stringItems);
            const elem = `<h3>Order #${i + 1}</h3>
            <ul>
                <li>Customer: ${orders[i].customerName}</li>
                <li>Address: ${orders[i].customerAddress}</li>
                <li>Items: ${stringItems}</li>
            </ul>`;

            document.getElementById('ordersDiv').innerHTML += elem;
        }

        for (let i = 0; i < items.length; i++) {
            const elem = `
            <h3>Item #${i + 1}</h3>
            <ul>
                <li>Name: ${items[i].name}</li>
                <li>Quantity: ${items[i].quantity}</li>
                <li>Items: ${items[i].price}</li>
            </ul>
            `;
            document.getElementById('itemsDiv').innerHTML += elem;
        }
    }
}());
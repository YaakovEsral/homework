import { Order } from "./shared/order";

export const orders: Order[] = [
    {
        person: {
            firstName: 'Yaakov',
            lastName: 'Esral',
            age: 24
        },
        address: {
            street: '4800 Park Heights Ave.',
            city: 'Baltimore',
            state: 'MD',
            zip: '21208'
        },
        item: {
            name: 'Speaker',
            price: 25.49,
            quantity: 1
        },

        date: '01/12/21'

    },
    {
        person: {
            firstName: 'AJ',
            lastName: 'Esral',
            age: 28
        },
        address: {
            street: '3028 Fallstaff Rd.',
            city: 'Baltimore',
            state: 'MD',
            zip: '21208'
        },
        item: {
            name: 'Snow boots',
            price: 70.79,
            quantity: 1
        },

        date: '10/05/20'
    },
    {
        person: {
            firstName: 'Nechama',
            lastName: 'Milch',
            age: 7
        },
        address: {
            street: '3021 Benhurst Road',
            city: 'Baltimore',
            state: 'MD',
            zip: '21209'
        },
        item: {
            name: 'Coloring book',
            price: 9.99,
            quantity: 2
        },

        date: '01/02/21'

    },
    {
        person: {
            firstName: 'Bubby Faye',
            lastName: 'Esral',
            age: 83
        },
        address: {
            street: '2390 Tilly Mill Road',
            city: 'Dunwoody',
            state: 'GA',
            zip: '30301'
        },
        item: {
            name: 'Space heater',
            price: 55.29,
            quantity: 1
        },

        date: '11/17/20'
    },
    {
        person: {
            firstName: 'Ayala',
            lastName: 'Esral',
            age: 16
        },
        address: {
            street: '1348 Bramble road',
            city: 'Atlanta',
            state: 'GA',
            zip: '30329'
        },
        item: {
            name: 'Airpods',
            price: 130.99,
            quantity: 1
        },

        date: '08/19/20'

    },
    {
        person: {
            firstName: 'Esti',
            lastName: 'Gavant',
            age: 32
        },
        address: {
            street: '1270 Biltmore Drive',
            city: 'Atlanta',
            state: 'Ga',
            zip: '30329'
        },
        item: {
            name: 'Stuffed bear',
            price: 20.00,
            quantity: 1
        },

        date: '9/08/20'
    }
]
import { Category } from "src/shared/category";

export const categories: Category[] = [
    {
        category: 'toys',
        items: [

        ]
    },
    {
        category: 'books',
        items: [
            {
                name: 'How to Win Friends and Influence People',
                subtitle: 'Dale Carnegie', 
                type: 'book',
                price: 20
            },
            {
                name: 'Mindset',
                subtitle: 'Carol Dweck',
                type: 'book',
                price: 15
            },
            {
                name: 'A Grief Observed',
                subtitle: 'C.S. Lewis',
                type: 'book',
                price: 12
            },
            {
                name: 'Frankenstein',
                subtitle: 'Mary Shelley',
                type: 'book',
                price: 14
            }
        ]
    },
    {
        category: 'clothing',
        items: [
            {
                name: 'shirt',
                price: 29
            },
            {
                name: 'pants',
                price: 32
            },
            {
                name: 'tie',
                price: 20
            },
            {
                name: 'belt',
                price: 25
            }
        ]
    },
    {
        category: 'sports',
        items: [
            {
                name: 'Baseball',
                price: 5
            },
            {
                name: 'Basketball',
                price: 16
            },
            {
                name: 'Ping Pong paddle',
                price: 5
            },
            {
                name: 'Golf clubs',
                price: 40
            }
        ]
    }
]
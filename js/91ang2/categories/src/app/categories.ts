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
                type: 'book'
            },
            {
                name: 'Mindset',
                subtitle: 'Carol Dweck',
                type: 'book'
            },
            {
                name: 'A Grief Observed',
                subtitle: 'C.S. Lewis',
                type: 'book'
            },
            {
                name: 'Frankenstein',
                subtitle: 'Mary Shelley',
                type: 'book'
            }
        ]
    },
    {
        category: 'clothing',
        items: [
            {
                name: 'shirt'
            },
            {
                name: 'pants'
            },
            {
                name: 'tie'
            },
            {
                name: 'belt'
            }
        ]
    },
    {
        category: 'sports',
        items: [
            {
                name: 'Baseball'
            },
            {
                name: 'Basketball'
            },
            {
                name: 'Ping Pong paddle'
            },
            {
                name: 'Golf clubs'
            }
        ]
    }
]
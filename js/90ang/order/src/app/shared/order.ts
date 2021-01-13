import Address from './address';
import Item from './item';
import Person from './person';

export interface Order {
    person: Person;
    address: Address;
    item: Item;
    date: string;
}
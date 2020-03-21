class Queue {
    constructor(...items) {
        this.items = items;
    }
    clear() {
        this.items.length = 0;
    }
    clone() {
        return new Queue(...this.items);
    }
    contains(item) {
        return this.items.includes(item);
    }
    peek() {
        var item = null;

        if (this.items.length > 0) {
            item = this.items[0];
        }

        return item;
    }
    remove() {
        var removedItem = this.items.shift();
        return removedItem;
    }
    add(item) {
        this.items.push(item);
        return item;
    }
}

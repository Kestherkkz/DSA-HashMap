// HashMaps helps us store key and value
// Without Collision : One huge disadvantage of this is that when setting new value it overrides the old value already stored 

export class HashMaps {
    size: number;
    private buckets: [string, any][][];

    constructor(size = 16) {
        this.size = size;
        this.buckets = new Array(size).fill(null).map(() => []);
    }

    private hash(key: string): number {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i) * i) % this.size; // Using modulos makes sure our hash is stored in the range of the bucket size using the remainder
        }
        return hash;
    }

    set(key: string, value: any): void {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            const [existingKey, _] = bucket[i];
            if (existingKey === key) {
                bucket[i][1] = value; 
                return;
            }
        }

        bucket.push([key, value]); // if there are no key or values, it adds it 
    }

    get(key: string): string {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            const [existingKey, value] = bucket[i];
            if (existingKey === key) {
                return value;
            }
        }
        return `${key} not found`;
    }

    remove(key: string): void {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1) 
                return
            }
        }
    }

    has(key: string): boolean {
        return this.get(key) !== undefined;
    }
}



// With Collision
// Here we are going to adopting doubly linked list to hold old values (so they wont be overide) when setting new values
export class ListNode {
    value: string
    next: ListNode | null
    prev: ListNode | null 

    constructor(value: string) {
        this.value = value
        this.next = null
        this.prev = null
    }
}


export class HashMap {
    private size: number
    private buckets: [string, ListNode][][]

    constructor(size = 16) {
        this.size = size
        this.buckets = new Array(size).fill(null).map(() => [])
    }

    private hash(key: string): number {
        let hash = 0
        for (let i = 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i) * i) % this.size
        }
        return hash
    }

    set(key: string, node: ListNode): void {
        const index = this.hash(key)
        const bucket = this.buckets[index]

        for (let i = 0; i < bucket.length; i++) {
            const [existingKey, head] = bucket[i]
            if (existingKey === key) {
                node.next = head
                head.prev = node
                bucket[i][1] = node
                return;
            }
        }
        bucket.push([key, node]) // Add new key-value pair
    }

    get(key: string): ListNode | undefined {
        const index = this.hash(key)
        const bucket = this.buckets[index]

        for (const [existingKey, value] of bucket) {
            if (existingKey === key) {
                return value
            }
        }
        return undefined
    }

    remove(key: string): void {
        const index = this.hash(key)
        const bucket = this.buckets[index]

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1)
                return;
            }
        }
    }

    removeValue(key: string, value: any): string {
        const index = this.hash(key)
        const bucket = this.buckets[index]

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                let current = bucket[i][1]

                while (current) {
                    if (current.value === value) {
                        if (current.prev) {
                            current.prev.next = current.next
                        } else {
                            // Removing the head node
                            bucket[i][1] = current.next as ListNode
                        }

                        if (current.next) {
                            current.next.prev = current.prev
                        }
                        return `${value} has been removed`;
                    }
                    current = current.next as ListNode;
                }
            }
        }
        return `${value} not found`;
    }

    has(key: string): boolean {
        return this.get(key) !== undefined
    }

    print(): void {
        for (let i = 0; i < this.size; i++) {
            const bucket = this.buckets[i]
            if (bucket.length > 0) {
                console.log(`Bucket ${i}:`)
                for (const [key, head] of bucket) {
                    const values: any[] = [];
                    let current = head
                    while (current) {
                        values.push(current.value)
                        current = current.next as ListNode;
                    }
                    console.log(`${key}: [${values.join(" -> ")}]`);
                }
            }
        }
    }
}
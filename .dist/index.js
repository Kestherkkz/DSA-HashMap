"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hashMap_1 = require("./hashMap");
// Without Collision
const Kkz = new hashMap_1.HashMaps();
Kkz.set("faculty", "Social Science");
Kkz.set("fruit", "apple");
Kkz.set("food", "Fried rice");
console.log(Kkz.get("faculty"));
console.log(Kkz.get("fruit"));
console.log(Kkz.get("food"));
console.log(Kkz.has("food"));
Kkz.remove("fruit");
console.log(Kkz.has("fruit"));
// With Collision
const Kkzz = new hashMap_1.HashMap();
const node1 = new hashMap_1.ListNode("apple");
const node2 = new hashMap_1.ListNode("banana");
const node3 = new hashMap_1.ListNode("cherry");
Kkzz.set("fruits", node1);
Kkzz.set("fruits", node2);
Kkzz.set("fruits", node3);
console.log(Kkzz.get("fruits"));
console.log(Kkzz.removeValue("fruits", "banana"));
console.log(Kkzz.get("fruits"));

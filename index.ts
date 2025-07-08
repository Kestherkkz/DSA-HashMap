import { HashMaps, ListNode, HashMap } from "./hashMap";

// Without Collision
const Kkz = new HashMaps()
Kkz.set("faculty", "Social Science")
Kkz.set("fruit", "apple")
Kkz.set("food", "Fried rice")
console.log(Kkz.get("faculty"))
console.log(Kkz.get("fruit"))
console.log(Kkz.get("food"))
console.log(Kkz.has("food"))
Kkz.remove("fruit")
console.log(Kkz.has("fruit"))

// With Collision
const Kkzz = new HashMap();
const node1 = new ListNode("apple");
const node2 = new ListNode("banana");
const node3 = new ListNode("cherry");
Kkzz.set("fruits", node1);     
Kkzz.set("fruits", node2);    
Kkzz.set("fruits", node3);
console.log(Kkzz.get("fruits"));
console.log(Kkzz.removeValue("fruits", "banana")); 
console.log(Kkzz.get("fruits"));
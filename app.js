class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    // the head always contains the 1st node, in this case an empty list represented by null.
    this.head = null;
  }
  // Inserting at the beginning. creates a new node item and points to the head of that node. O(1)
  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }
  // Inserting at the end (view notes for explanation) O(n)
  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }
  insertBefore(item, beforeItem) {
    if (this.head === null) {
      this.insertFirst(item);
      return;
    }
    let currNode = this.head;
    let previousNode = this.head;

    while (currNode !== null && currNode.value !== beforeItem) {
      previousNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      this.insertLast(item);
    }
    const tempNode = new _Node(item, currNode);

    previousNode.next = tempNode;
  }
  insertAfter(item, afterItem) {
    if (this.head === null) {
      this.insertFirst(item);
      return;
    }
    let currNode = this.find(afterItem);

    if (currNode === null) {
      this.insertLast(item);
      return;
    }
    const tempNode = new _Node(item, currNode.next);

    currNode.next = tempNode;
  }
  insertAt(item, spot) {
    if (this.head === null) {
      this.insertFirst(item);
      return;
    }
    let currNode = this.head;
    let currentSpot = 1;

    while (currentSpot > spot - 1) {
      currNode = currNode.next;
      currentSpot++;
    }
    const tempNode = new _Node(item, currNode.next);

    currNode.next = tempNode;
  }
  find(item) {
    // Start at the head
    let currNode = this.head;
    // If the list is empty
    if (!this.head) {
      return null;
    }
    // Check for the item
    while (currNode.value !== item) {
      /* Return null if it's the end of the list 
             and the item is not on the list */
      if (currNode.next === null) {
        return null;
      } else {
        // Otherwise, keep looking
        currNode = currNode.next;
      }
    }
    // Found it
    return currNode;
  }
  remove(item) {
    // If the list is empty
    if (!this.head) {
      return null;
    }
    // If the node to be removed is head, make the next node head.
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }
    // Start at the head
    let currNode = this.head;
    // Keep track of previous
    let previousNode = this.head;
    while (currNode !== null && currNode.value !== item) {
      // save the previous node
      previousNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log("Item not found");
      return;
    }
    previousNode.next = currNode.next;
  }
}

function main() {
  const SLL = new LinkedList();
  SLL.insertFirst("Apollo");
  SLL.insertFirst("Boomer");
  SLL.insertFirst("Helo");
  SLL.insertFirst("Husker");
  SLL.insertFirst("Starbuck");
  SLL.insertFirst("Tauhida");
  SLL.remove("husker");
  SLL.insertBefore("Athena", "Boomer");
  SLL.insertAfter("Hotdog", "Helo");
  SLL.insertAt("Kat", 3);
  SLL.remove("Tauhida");
  console.log(SLL);
  return SLL;
}
// main();

let LL = main();

function display(LL) {
  let output = "";

  let currNode = LL.head;

  while (currNode !== null) {
    output += currNode.value;

    if (currNode.next !== null) {
      output += " - ";
    }
    currNode = currNode.next;
  }
  console.log(output);
  return output;
}

display(LL);

function size(LL) {
  let size = 0;

  let currNode = LL.head;

  while (currNode !== null) {
    size++;
    currNode = currNode.next;
  }
  console.log("Linked list size is:", size);
  return size;
}
size(LL);

const emptyLL = new LinkedList();
console.log(size(emptyLL));

function isEmpty(LL) {
  if (LL.head === null) {
    return true;
  }
  return false;
}
console.log(isEmpty(LL));
console.log(isEmpty(emptyLL));

function findPrevious(item, LL) {
  if (LL.head === null) {
    console.log("list is empty");
    return;
  }
  let currNode = LL.head;
  let prevNode = LL.head;

  while (currNode !== null && currNode.value !== item) {
    prevNode = currNode;
    currNode = currNode.next;
  }
  if (currNode === null) {
    console.log("item not found");
    return;
  }
  console.log(prevNode.value);
  return prevNode.value;
}

findPrevious("Athena", LL);
findPrevious("Athena", emptyLL);
findPrevious("james", LL);

function findLast(LL) {
  if (LL.head === null) {
    console.log("list be empty");
    return;
  }
  let currNode = LL.head;

  while (currNode.next !== null) {
    currNode = currNode.next;
  }
  console.log(currNode.value);
  return currNode.value;
}

findLast(LL);

// Mystery program - Exponential time O(2^n)
// Looking down to the conditional it looks as if its comparing the values of the nodes, then continues on to the rest of the list. maybe checking for duplicates?

function reverseList(LL) {
  let currNode = LL.head;
  let prevNode = LL.head;
  let nextNode = currNode.next;

  while (nextNode !== null) {
    if (currNode === prevNode) {
      currNode.next = null;
    } else {
      currNode.next = prevNode;
    }

    prevNode = currNode;
    currNode = nextNode;
    nextNode = nextNode.next;
  }
  if (nextNode === null) {
    LL.head = currNode;
    currNode.next = prevNode;
  }
  return LL;
}
display(reverseList(LL));

function thirdToLast(LL) {
  let currNode = LL.head;

  if (currNode === null) {
    console.log("Not found");
  }
  while (currNode.next.next.next !== null) {
    currNode = currNode.next;
  }
  console.log(currNode.value);
  return currNode.value;
}
thirdToLast(LL);

function middle(LL) {
  let twiceNode = LL.head;
  let onceNode = LL.head;
  while (twiceNode !== null) {
    twiceNode = twiceNode.next.next;
    onceNode = onceNode.next;
  }
  console.log(onceNode.value);
  return onceNode.value;
}

const newList = new LinkedList();
newList.insertFirst("DUDES");
newList.insertFirst("MY");
newList.insertFirst("WEDNESDAY");
newList.insertFirst("IT IS");

function makeCycle(LL) {
  let currNode = LL.head;

  while (currNode.next !== null) {
    currNode = currNode.next;
  }
  currNode.next = LL.head;

  return LL;
}

display(newList);

function cycleList(lst) {
  const listHead = lst.head;
  let currNode = lst.head.next;
  console.log(listHead.value + " " + currNode.value);
  while (currNode.next !== null && currNode.next !== listHead) {
    console.log(currNode.value + " " + currNode.next.value);
    currNode = currNode.next;
  }
  if (currNode.next === listHead) {
    return true;
  } else {
    return false;
  }
}
const anotherList = new LinkedList();
anotherList.insertFirst("DUDES");
anotherList.insertFirst("MY");
anotherList.insertFirst("WEDNESDAY");
anotherList.insertFirst("IT IS");

const cycleLinkedList = makeCycle(newList);

console.log(cycleList(anotherList));
console.log(cycleList(cycleLinkedList));

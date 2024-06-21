document.addEventListener("DOMContentLoaded", function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav ul li a');

    // Add click event listener to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            const targetId = this.getAttribute('href'); // Get the target visualizer ID
            const targetVisualizer = document.querySelector(targetId); // Select the target visualizer

            // Remove 'active' class from all visualizers
            document.querySelectorAll('.visualizer').forEach(vis => vis.classList.remove('active'));

            // Add 'active' class to the clicked visualizer
            targetVisualizer.classList.add('active');
        });
    });
});


class Stack {
    constructor() {
        this.stack = [];
        this.top = null;
        this.lastPushed = null;
        this.lastPopped = null;
        this.maxSize = 5;
    }

    push(value) {
        if(this.stack.length < this.maxSize){
            this.stack.push(value);
            this.top = value;
            this.lastPushed = value;
            this.lastPopped = null;
            this.display();
            this.displayMessage(`Pushed: ${value}`, 'add');
        }else {
            this.displayMessage('Stack is full', 'message');
        }
    }

    pop() {
        if (this.stack.length > 0) {
            this.lastPopped = this.stack.pop();
            this.top = this.stack[this.stack.length - 1] || null;
            this.lastPushed = null;
            this.display();
            this.displayMessage(`Popped: ${this.lastPopped}`, 'remove');
        } else {
            this.displayMessage('Stack is empty', 'message');
        }
    }

    display() {
        const container = document.querySelector(".main-stack-bucket");
        container.innerHTML = "";
        this.stack.forEach(value => {
            const element = document.createElement("div");
            element.classList.add("ele");
            element.innerText = value;
            container.appendChild(element);
        });

        document.querySelector('.top-box').innerText = this.top || '';
        document.querySelector('.last-pushed-box').innerText = this.lastPushed || '';
        document.querySelector('.last-popped-box').innerText = this.lastPopped || '';
        document.querySelector('.size-box').innerText = this.stack.length;
    }

    displayMessage(message, type) {
        const messageBox = document.querySelector('.message');
        messageBox.innerHTML = `<p class="${type}">${message}</p>`;
        setTimeout(() => {
            messageBox.innerHTML = '';
        }, 3000);
    }
}

class Queue {
    constructor() {
        this.queue = [];
        this.front = null;
        this.lastEnqueued = null;
        this.lastDequeued = null;
        this.maxSize = 5;
    }

    enqueue(value) {
        if (this.queue.length < this.maxSize) {
            this.queue.push(value);
            this.front = this.queue[0];
            this.lastEnqueued = value;
            this.lastDequeued = null;
            this.display();
            this.displayMessage(`Enqueued: ${value}`, 'add');
        } else {
            this.displayMessage('Queue is full', 'message');
        }
    }

    dequeue() {
        if (this.queue.length > 0) {
            this.lastDequeued = this.queue.shift();
            this.front = this.queue[0] || null;
            this.lastEnqueued = null;
            this.display();
            this.displayMessage(`Dequeued: ${this.lastDequeued}`, 'remove');
        } else {
            this.displayMessage('Queue is empty', 'message');
        }
    }

    reset() {
        this.queue = [];
        this.front = null;
        this.lastEnqueued = null;
        this.lastDequeued = null;
        this.size = 0;
        this.display();
        this.displayMessage('queue reset', 'message');
    }

    display() {
        const container = document.querySelector(".queue-display");
        container.innerHTML = "";
        this.queue.forEach(value => {
            const element = document.createElement("div");
            element.classList.add("node");
            element.innerText = value;
            container.appendChild(element);
        });

        document.querySelector('.front-box').innerText = this.front || '';
        document.querySelector('.last-enqueued-box').innerText = this.lastEnqueued || '';
        document.querySelector('.last-dequeued-box').innerText = this.lastDequeued || '';
        document.querySelector('.queue-size-box').innerText = this.queue.length;
    }

    displayMessage(message, type) {
        const messageBox = document.querySelector('.queue-message');
        messageBox.innerHTML = `<p class="${type}">${message}</p>`;
        setTimeout(() => {
            messageBox.innerHTML = '';
        }, 3000);
    }
}

const stack = new Stack();
const queue = new Queue();

document.querySelector(".push").addEventListener("click", () => {
    const value = document.querySelector(".text").value;
    if (value !== "") {
        stack.push(value);
        document.querySelector(".text").value = "";
    }
});

document.querySelector(".pop").addEventListener("click", () => {
    stack.pop();
});

document.querySelector(".reset").addEventListener("click", () => {
    stack.stack = [];
    stack.top = null;
    stack.lastPushed = null;
    stack.lastPopped = null;
    stack.display();
});


document.querySelector(".queue-enqueue").addEventListener("click", () => {
    const value = document.querySelector(".queue-input").value;
    if (value !== "") {
        queue.enqueue(value);
        document.querySelector(".queue-input").value = "";
    }
});

document.querySelector(".queue-dequeue").addEventListener("click", () => {
    queue.dequeue();
});



class LinkedListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.lastAppended = null;
        this.lastDeleted = null;
        this.size = 0;
    }


    append(value) {
        const newNode = new LinkedListNode(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.lastAppended = value;
        this.lastDeleted = null;
        this.size++;
        this.display();
        this.displayMessage(`Appended: ${value}`, 'message');
    }

    delete(value) {
        if (!this.head) return;

        if (this.head.value === value) {
            this.head = this.head.next;
        } else {
            let current = this.head;
            while (current.next && current.next.value !== value) {
                current = current.next;
            }
            if (current.next) {
                current.next = current.next.next;
            }
        }
        this.lastDeleted = value;
        this.lastAppended = null;
        this.size--;
        this.display();
        this.displayMessage(`Deleted: ${value}`, 'message');
    }

    reset() {
        this.head = null;
        this.lastAppended = null;
        this.lastDeleted = null;
        this.size = 0;
        this.display();
        this.displayMessage('List reset', 'message');
    }

    display() {
        const container = document.querySelector(".linkedlist-display");
        container.innerHTML = "";
        let current = this.head;
        while (current) {
            const node = document.createElement("div");
            node.classList.add("node");
            node.innerText = current.value;
            container.appendChild(node);
            current = current.next;
        }

        document.querySelector('.head-box').innerText = this.head ? this.head.value : '';
        document.querySelector('.last-appended-box').innerText = this.lastAppended || '';
        document.querySelector('.last-deleted-box').innerText = this.lastDeleted || '';
        document.querySelector('.list-size-box').innerText = this.size;
    }

    displayMessage(message, type) {
        const messageBox = document.querySelector('.linkedlist-message');
        messageBox.innerHTML = `<p class="${type}">${message}</p>`;
        setTimeout(() => {
            messageBox.innerHTML = '';
        }, 3000);
    }
}

const linkedList = new LinkedList();

document.querySelector(".linkedlist-append").addEventListener("click", () => {
    const value = document.querySelector(".linkedlist-input").value;
    if (value !== "") {
        linkedList.append(value);
        document.querySelector(".linkedlist-input").value = "";
    }
});

document.querySelector(".linkedlist-delete").addEventListener("click", () => {
    const value = document.querySelector(".linkedlist-input").value;
    if (value !== "") {
        linkedList.delete(value);
        document.querySelector(".linkedlist-input").value = "";
    }
});

document.querySelector(".linkedlist-reset").addEventListener("click", () => {
    linkedList.reset();
});

document.querySelector(".queue-reset").addEventListener("click", () => {
    queue.reset();
});

class ArrayDS {
    constructor() {
        this.array = new Array(5).fill(null); // Initialize with null to represent empty slots
        this.lastAdded = null;
        this.lastRemoved = null;
        this.maxSize = 5;
    }

    add(index, value) {
        if (index < 0 || index >= this.maxSize) {
            this.displayMessage('Index out of bounds', 'message');
            return;
        }

        if (this.array[index] === null) {
            this.array[index] = value;
            this.lastAdded = value;
            this.lastRemoved = null;
            this.display();
            this.displayMessage(`Added: ${value} at index ${index}`, 'add');
        } else {
            this.displayMessage('Index already occupied', 'message');
        }
    }

    remove(index) {
        if (index < 0 || index >= this.maxSize) {
            this.displayMessage('Index out of bounds', 'message');
            return;
        }

        if (this.array[index] !== null) {
            this.lastRemoved = this.array[index];
            this.array[index] = null;
            this.lastAdded = null;
            this.display();
            this.displayMessage(`Removed: ${this.lastRemoved} from index ${index}`, 'remove');
        } else {
            this.displayMessage('No element at specified index', 'message');
        }
    }

    reset() {
        this.array.fill(null);
        this.lastAdded = null;
        this.lastRemoved = null;
        this.display();
        this.displayMessage('Array reset', 'message');
    }

    display() {
        const container = document.querySelector(".array-display");
        container.innerHTML = "";
        this.array.forEach((value, index) => {
            const element = document.createElement("div");
            element.classList.add("node");
            element.innerText = value !== null ? value : '-';
            container.appendChild(element);
        });

        document.querySelector('.array-size-box').innerText = this.array.filter(value => value !== null).length;
        document.querySelector('.array-last-added-box').innerText = this.lastAdded !== null ? this.lastAdded : '';
        document.querySelector('.array-last-removed-box').innerText = this.lastRemoved !== null ? this.lastRemoved : '';
    }

    displayMessage(message, type) {
        const messageBox = document.querySelector('.array-message');
        messageBox.innerHTML = `<p class="${type}">${message}</p>`;
        setTimeout(() => {
            messageBox.innerHTML = '';
        }, 3000);
    }
}


class Dequeue {
    constructor() {
        this.dequeue = [];
        this.lastAdded = null;
        this.lastRemoved = null;
        this.maxSize = 5;
    }

    addFront(value) {
        if (this.dequeue.length < this.maxSize) {
            this.dequeue.unshift(value);
            this.lastAdded = value;
            this.lastRemoved = null;
            this.display();
            this.displayMessage(`Added to front: ${value}`, 'add');
        } else {
            this.displayMessage('Dequeue is full', 'message');
        }
    }

    addRear(value) {
        if (this.dequeue.length < this.maxSize) {
            this.dequeue.push(value);
            this.lastAdded = value;
            this.lastRemoved = null;
            this.display();
            this.displayMessage(`Added to rear: ${value}`, 'add');
        } else {
            this.displayMessage('Dequeue is full', 'message');
        }
    }

    removeFront() {
        if (this.dequeue.length > 0) {
            this.lastRemoved = this.dequeue.shift();
            this.lastAdded = null;
            this.display();
            this.displayMessage(`Removed from front: ${this.lastRemoved}`, 'remove');
        } else {
            this.displayMessage('Dequeue is empty', 'message');
        }
    }

    removeRear() {
        if (this.dequeue.length > 0) {
            this.lastRemoved = this.dequeue.pop();
            this.lastAdded = null;
            this.display();
            this.displayMessage(`Removed from rear: ${this.lastRemoved}`, 'remove');
        } else {
            this.displayMessage('Dequeue is empty', 'message');
        }
    }

    reset() {
        this.dequeue = [];
        this.lastAdded = null;
        this.lastRemoved = null;
        this.display();
        this.displayMessage('Dequeue reset', 'message');
    }

    display() {
        const container = document.querySelector(".dequeue-display");
        container.innerHTML = "";
        this.dequeue.forEach(value => {
            const element = document.createElement("div");
            element.classList.add("node");
            element.innerText = value;
            container.appendChild(element);
        });

        document.querySelector('.dequeue-size-box').innerText = this.dequeue.length;
        document.querySelector('.dequeue-last-added-box').innerText = this.lastAdded || '';
        document.querySelector('.dequeue-last-removed-box').innerText = this.lastRemoved || '';
    }

    displayMessage(message, type) {
        const messageBox = document.querySelector('.dequeue-message');
        messageBox.innerHTML = `<p class="${type}">${message}</p>`;
        setTimeout(() => {
            messageBox.innerHTML = '';
        }, 3000);
    }
}

const arrayDS = new ArrayDS();
const dequeue = new Dequeue();


document.querySelector(".array-add").addEventListener("click", () => {
    const index = document.querySelector(".array-index").value;
    const value = document.querySelector(".array-value").value;
    if (index !== '' && value !== '') {
        arrayDS.add(Number(index), Number(value));
        document.querySelector(".array-index").value = "";
        document.querySelector(".array-value").value = "";
    }
});

document.querySelector(".array-remove").addEventListener("click", () => {
    const index = document.querySelector(".array-index").value;
    if (index !== '') {
        arrayDS.remove(Number(index));
        document.querySelector(".array-index").value = "";
    }
});

document.querySelector(".array-reset").addEventListener("click", () => {
    arrayDS.reset();
});

document.querySelector(".dequeue-add-front").addEventListener("click", () => {
    const value = document.querySelector(".dequeue-input").value;
    if (value) {
        dequeue.addFront(Number(value));
        document.querySelector(".dequeue-input").value = "";
    }
});

document.querySelector(".dequeue-add-rear").addEventListener("click", () => {
    const value = document.querySelector(".dequeue-input").value;
    if (value) {
        dequeue.addRear(Number(value));
        document.querySelector(".dequeue-input").value = "";
    }
});

document.querySelector(".dequeue-remove-front").addEventListener("click", () => {
    dequeue.removeFront();
});

document.querySelector(".dequeue-remove-rear").addEventListener("click", () => {
    dequeue.removeRear();
});

document.querySelector(".dequeue-reset").addEventListener("click", () => {
    dequeue.reset();
});

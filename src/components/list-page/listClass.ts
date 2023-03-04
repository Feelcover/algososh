import Node from "./nodeClass";

interface IList<T> {}

export default class List<T> implements IList<T> {
  private size: number;
  private head: Node<T> | null;
  private tail: Node<T> | null;
  constructor(arr?: T[]) {
    this.size = 0;
    this.head = null;
    this.tail = null;
    arr?.forEach((el) => this.addToHead(el));
  }

  addToHead(el: T) {
    const node = new Node(el);
    let current = null;

    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
      return this;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  addToTail(el: T): void {
    const node = new Node(el, this.head);
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    this.size++;
  }

  deleteInHead() {
    if (this.head) {
      this.head = this.head.next;
      this.size--;
    }
  }

  deleteInTail() {
    let current;
    if (!this.head?.next) {
      this.head = null;
    } else {
      current = this.head;
      while (current.next?.next) {
        current = current.next;
      }
      current.next = null;
    }
    this.size--;
  }


  addByIndex(el: T, index: number) {
    if (index < 0) {
      console.log("Enter a valid index");
      return;
    } else {
      const node = new Node(el);
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else if (this.head) {
        let currentHead = this.head;
        let currentIndex = 0;
        while (currentIndex < index && currentHead.next) {
          currentHead = currentHead.next;
          currentIndex++;
        }
        node.next = currentHead;
        currentHead.next = node;
        this.size++;
      }
    }
  }


  deleteByIndex(index: number) {
    if (index < 0 || index > this.size) {
      return;
    }
    let current = this.head;
    if (index === 0) {
      if (this.head) this.head = this.head?.next;
    } else {
      let preventIndex = null;
      let currentIndex = 0;
      while (currentIndex++ < index) {
        preventIndex = current;
        if (current) {
          current = current.next;
        }
      }
      if (preventIndex?.next)
        preventIndex.next = current?.next ? current.next : null;
    }
    this.size--;
  }
}

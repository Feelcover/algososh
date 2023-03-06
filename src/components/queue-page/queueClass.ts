interface IQueue<T> {
  getSize: () => number;
  isEmpty: () => boolean;
  getHead: () => number;
  getTail: () => number;
  enqueue: (item: T) => void;
  dequeue: () => void;
  getElements: () => Array<T | undefined>;
  clear: () => void;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | undefined)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.container = Array(size);
    this.size = size;
  }

  getSize = () => this.size;

  isEmpty = () => this.length === 0;

  getHead = () => this.head;

  getTail = () => this.tail;

  getFull = () => {
   if (this.length >= this.size) {
      return true
    }else{
      return false
    }
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      console.log(new Error("Максимальная длинна очереди достигнута"));
    }
    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      console.log(new Error("Очередь пуста"));
    }
    this.container[this.head % this.size] = undefined;
    this.head = this.head + 1 === this.size ? 0 : this.head + 1;
    this.length--;
  };

  getElements = (): (T | undefined)[] => [...this.container];

  clear = () => {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    this.container = Array(this.size);
  };
}

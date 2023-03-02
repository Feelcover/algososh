interface IStack<T> {
  get: () => (T | null)[];
  push:(item: T) => void;
  delete:() => void;
  clear:() => void;
}
export default class Stack<T> implements IStack<T> {
  private container: T[] = [];

  get = () => {
    const arr = [];
    for (let i = 0; i < this.container.length; i++) {
      arr.push(this.container[i]);
    }
    return arr;
  };

  push = (item: T) => {
    this.container.push(item);
  };
  delete = () => {
    this.container.pop();
  };
  clear = () => {
    this.container = [];
  };
}

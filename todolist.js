const Todo = require('./todo.js');

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todo) {
    if (!(todo instanceof Todo)) {
      throw new TypeError('Not a Todo type');
    }
    this.todos.push(todo);
  }

  size() {
    return this.todos.length;
  }

  first() {
    if (this.todos.length === 0) return undefined;
    return this.todos[0];
  }

  last() {
    if (this.todos.length === 0) return undefined;
    return this.todos[this.size() - 1];
  }

  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }

  markDoneAt(index) {
    this.itemAt(index).markDone();
  }

  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }

  isDone() {
    return this.todos.every(todo => todo.isDone());
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(index) {
    this._validateIndex(index);
    return this.todos.splice(index, 1)[0];
  }

  toString() {
    let string = `---- ${this.title} ----`;
    this.todos.forEach(todo => {
      string += '\n' + todo.toString();
    });
    return string;
  }

  forEach(callback) {
    this.todos.forEach(callback);
  }

  filter(callback) {
    let filtered = new TodoList(this.title);
    this.todos.forEach(todo => {
      if (callback(todo)) {
        filtered.add(todo);
      }
    });
    return filtered;
  }

  findByTitle(title) {
    let found = this.filter(todo => todo.getTitle() === title);
    if (found.size() === 0) return undefined;
    return found.first();
  }

  allDone() {
    return this.filter(todo => todo.isDone());
  }

  allNotDone() {
    return this.filter(todo => !todo.isDone());
  }

  markDone(title) {
    let match = this.findByTitle(title);
    if (match) {
      match.markDone();
    }
  }

  markAllDone() {
    this.forEach(todo => todo.markDone());
  }

  markAllUndone() {
    this.forEach(todo => todo.markUndone());
  }

  toArray() {
    return this.todos.slice();
  }

  _validateIndex(index) {
    if (!(index in this.todos)) {
      throw new ReferenceError(`invalid index: ${index}`);
    }
  }
  // rest of class needs implementation
}

module.exports = TodoList;
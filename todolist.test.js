/* eslint-disable max-lines-per-function */
const Todo = require('./todo');
const TodoList = require('./todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  // your tests go here
  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });
  test('toArray returns an array', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });
  test('first item is Buy milk', () => {
    expect(list.first().getTitle()).toEqual('Buy milk');
  });
  test('last item is todo3', () => {
    expect(list.last()).toEqual(todo3);
  });
  test('shift removes and returns first item', () => {
    expect(list.shift()).toEqual(todo1);
    expect(list.size()).toEqual(2);
  });
  test('pop removes and returns last item', () => {
    expect(list.pop()).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });
  test('tells us if all items are done', () => {
    expect(list.isDone()).toBe(false);
    list.markDoneAt(0);
    list.markDoneAt(1);
    list.markDoneAt(2);
    expect(list.isDone()).toBe(true);
  });
  test('can only add Todo objects', () => {
    expect(() => list.add('1234')).toThrow(TypeError);
  });
  test('raises ReferenceError if invalid index', () => {
    expect(list.itemAt(0)).toEqual(todo1);
    expect(() => list.itemAt(5)).toThrow(ReferenceError);
    expect(() => list.itemAt()).toThrow(ReferenceError);
  });
  test('marks todo as done and raises ReferenceError if invalid index', () => {
    list.markDoneAt(0);
    expect(todo1.isDone()).toBe(true);
    expect(() => list.markDoneAt(6)).toThrow(ReferenceError);
  });
  test('marks todo as undone', () => {
    list.markDoneAt(1);
    list.markUndoneAt(1);
    expect(todo2.isDone()).toBe(false);
    expect(() => list.markDoneAt(5)).toThrow(ReferenceError);
  });
  test('marks all todos as done', () => {
    list.markAllDone();
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
    expect(list.isDone()).toBe(true);
  });
  test('marks all todos as not done', () => {
    list.markAllDone();
    list.markAllUndone();
    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(false);
    expect(list.isDone()).toBe(false);
  });
  test('remmoves element at index, raises error if not found', () => {
    list.removeAt(0);
    expect(list.toArray()).toEqual([todo2, todo3]);
    expect(() => list.removeAt(4)).toThrow(ReferenceError);
  });
  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });
  test('toString returns correct string when todo is done', () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[ ] Clean room
[ ] Go to the gym`;
    list.markDoneAt(0);
    expect(list.toString()).toBe(string);
  });
  test('toString returns correct string when all todos are done', () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;
    list.markAllDone();
    expect(list.toString()).toBe(string);
  });
  test('forEach iterates over all elements', () => {
    let result = [];
    list.forEach(todo => result.push(todo));
    expect(result).toEqual([todo1, todo2, todo3]);
  });
  test('filter returns a todolist object', () => {
    list.markDoneAt(1);
    list.markDoneAt(2);
    let filtered = list.filter(todo => todo.isDone());
    let newList = new TodoList("Today's Todos");
    newList.add(todo2);
    newList.add(todo3);
    expect(filtered.toString()).toBe(newList.toString());
  });
  test('finds item by title', () => {
    expect(list.findByTitle('Clean room')).toEqual(todo2);
    expect(list.findByTitle('test')).toBe(undefined);
  });

});
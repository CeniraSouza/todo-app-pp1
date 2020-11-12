//Creates random id
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// console.log(uuidv4());

//Todos
class Todo {
  constructor(title, description, duration, done) {
    //Check type
    if (typeof title !== 'string') {
      throw new Error(
        `A todo title must be a string. Received ${typeof title}`,
      );
    }

    //Check value
    if (!title.length) {
      throw new Error(`A todo title cannot be an empty string.`);
    }

    this.title = title;
    this.description = description;
    this.duration = duration;
    this.done = done;
    this._id = uuidv4();
  }
  shortReport() {
    return `${this.title} ${this.description} (${this.duration}) done: ${this.done} _id: ${this._id}`;
  }
}
// test and tested check type and value ok

const firstTodo = new Todo(
  'Make website',
  'Plan steps, write plan and do the website using VSCode',
  '3 weeks',
  true,
);
console.log('firstTodo', firstTodo);

//APP

class TodoList {
  #todos = [];

  constructor(todoData) {
    console.log('todoData', todoData);
    if (!Array.isArray(todoData)) {
      throw new Error(
        `todoData must be an array. Received ${todoData} (${typeof todoData})`,
      );
    }

    todoData.forEach(
      function (data) {
        const newTodo = new Todo(
          data.title,
          data.description,
          data.duration,
          data.done,
        );
        this.#todos.push(newTodo);
      }.bind(this),
    );
  }
  addTodo(data) {
    if (!data) throw new Error('No data provided to addTodo method');
    const newTodo = new Todo(
      data.title,
      data.description,
      data.duration,
      data.done,
    );
    newTodo._id = this.#todos.length;
    this.#todos.push(newTodo);
  }
  getTodos() {
    return this.#todos; //Need to return a copy, not the actual array
  }
  updateTodo(id, changes) {
    if (id == null) throw new Error('No id provided to update Todo method');
  }

  // { title: 'newTitle' }

  if(changes) {
    const index = this.#todos.findIndex(function (todo) {
      return todo._id === id;
    });

    if (changes.title) {
      this.#todos[index].title = changes.title;
    }

    if (changes.duration) {
      this.#todos[index].duration = changes.duration;
    }

    if (changes.description) {
      this.#todos[index].description = changes.description;
    }

    if (changes.done) {
      this.#todos[index].done = changes.done;
    } else {
      console.warn('No changes passed to updateTodo method');
    }
  }
  deleteTodo(id) {
    if (id == null) throw new Error('No id provided to deleteTodo method');

    //Find
    const index = this.#todos.findIndex(function (todo) {
      return todo._id === id;
    });

    //Remove
    this.#todos.splice(index, 1);
  }
}

const rawData = [
  {
    title: 'Prepare test procedure',
    description: 'Write a procedure report with screenshots.',
    duration: '3hrs',
    done: true
  },
  {
    title: 'Make audit app',
    description: 'Use React Native documentation.',
    duration: '24hrs',
    done: false
  },
  {
    title: 'Prepare apprenticeship submission',
    description: 'Gather screenshots and write steps based on guidance',
    duration: '8hrs',
    done: true
  },
  {
    title: 'Update apprenticeship off-job training',
    description: 'Update spreadsheet based on guidance and tasks done',
    duration: '1hr',
    done: true
  }
];

const priorityTodoList = new TodoList(rawData);

const priorityTwoTodoList = new TodoList([
  {
    title: 'Finalise second half of website project',
    description: 'Follow instructions and theory learned',
    duration: '24hrs',
    done: false
  },
]);

console.log('Priority', priorityTodoList);
console.log('Second Priority', priorityTwoTodoList);

//CREATE

const newTodoData = {
  title: 'Read Discrete Maths',
  description: 'Follow instructions in coursera for which pages to read',
  duration: '24hrs',
  done: false
};

priorityTwoTodoList.addTodo(newTodoData);
console.log('Second Priority with one added', priorityTwoTodoList);

// console.log(priorityTwoTodoList.TodoList.#todos[1].shortReport());

// priorityTwoTodoList.todos.length = 0;

//READ

console.log('Second Priority Todos', priorityTwoTodoList.getTodos());

//UPDATE (not working)

priorityTodoList.updateTodo(2, {
  title: 'Make audit and other app',
  done: true
});
console.log('Priority Todos after', priorityTodoList.getTodos());

//DELETE
console.log('Priority Todos before', priorityTodoList.getTodos());
priorityTodoList.deleteTodo(4);

/*********************************
 * CONCEPT: CRUD
 * *******************************/
// C - Create *
// R - Read *
// U - Update *
// D - Delete *

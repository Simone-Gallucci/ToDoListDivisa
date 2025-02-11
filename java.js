 const todoForm = document.getElementById("todo-form");
    const todoList = document.getElementById("todo-list");

    let todos = [];

    function createTodoItem(todo) {
      const li = document.createElement("li");
      li.classList.add("todo-item");
      if (todo.completed) li.classList.add("completed");

      const titleSpan = document.createElement("span");
      titleSpan.classList.add("title");
      titleSpan.textContent = `${new Date(todo.datetime).toLocaleString('it-IT')} - ${todo.title}`;
      titleSpan.addEventListener('click', () => {
        li.classList.toggle('completed');
        todo.completed = li.classList.contains('completed');
        saveTodos();
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Elimina';
      deleteBtn.className = 'delete-btn';
      deleteBtn.addEventListener('click', () => {
        todos = todos.filter(t => t !== todo);
        updateList();
      });

      li.appendChild(titleSpan);
      li.appendChild(deleteBtn);
      return li;
    }

    function addTodo(event) {
      event.preventDefault();

      const title = event.target.elements["title"].value.trim();
      const datetime = event.target.elements["datetime"].value;
      const description = event.target.elements["description"].value.trim();
      const completed = event.target.querySelector('[name=completed]:checked').value === 'true';

      if (!title) return alert("Inserisci un titolo!");

      const newTodo = { title, datetime, description, completed };
      todos.push(newTodo);
      updateList();
      event.target.reset();
    }

    function updateList() {
      todoList.innerHTML = "";
      todos.forEach(todo => todoList.appendChild(createTodoItem(todo)));
      saveTodos();
    }

    function saveTodos() {
      localStorage.setItem("todos", JSON.stringify(todos));
    }

    function loadTodos() {
      const storedTodos = JSON.parse(localStorage.getItem("todos"));
      if (storedTodos) {
        todos = storedTodos;
        updateList();
      }
    }

    todoForm.addEventListener('submit', addTodo);
    window.onload = loadTodos;
  </script>

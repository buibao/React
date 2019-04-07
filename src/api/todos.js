const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';
// const fetchTodos = query =>
const fetchTodos =
  fetch(BASE_URL)
    .then(response => response.json());

export default fetchTodos;
export type TypeTodo = {
  id: string;
  task: string;
  isCompleted: boolean;
  date: string;
}

export type TypeTodoItem = {
  todo: TypeTodo;
  // changeIsComplete: ( id: string, value: boolean ) => void;
  dispatch: React.Dispatch<Action>;
  index: number;
}

export type TypeTodoList = {
  todos: TypeTodo[];
  dispatch: React.Dispatch<Action>;
  filteredTodos: string;
  searching: string;
  setTodos: React.Dispatch<React.SetStateAction<TypeTodo[]>>;
}

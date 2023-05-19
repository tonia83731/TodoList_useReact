import TodoItem from './TodoItem';

const TodoCollection = ({
  todos,
  onToggleDone,
  onSave,
  onDelete,
  onChangeMode,
}) => {
  return (
    <div>
      {todos.map((todo) => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
            onSave={({ id, title }) => onSave?.({ id, title })}
            onToggleDone={(id) => {
              onToggleDone?.(id);
            }}
            onChangeMode={({ id, isEdit }) => onChangeMode?.({ id, isEdit })}
            onDelete={(id) => {
              onDelete?.(id);
            }}
          />
        );
      })}
    </div>
    // <div>
    //   TodoCollection
    //   <TodoItem />
    //   <TodoItem />
    //   <TodoItem />
    //   <TodoItem />
    //   <TodoItem />
    // </div>
  );
};

export default TodoCollection;

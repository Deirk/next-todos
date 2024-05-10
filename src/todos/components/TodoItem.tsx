'use client'

import { startTransition, useOptimistic } from 'react'
import { Todo } from "@prisma/client"
import styles from '../styles/TodoItem.module.css'
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

interface Props {
  todo: Todo;
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {

  const [todoOptimistic, toogleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({ ...state, complete: newCompleteValue })
  );

  const onToggleTodo = async () => {
    try {
      startTransition(() => toogleTodoOptimistic(!todoOptimistic.complete));
      await toggleTodo(todoOptimistic.id, !todoOptimistic.complete);
    } catch (error) {
      startTransition(() => toogleTodoOptimistic(!todoOptimistic.complete));
    }
  }

  return (
    <div className={todoOptimistic.complete ? styles.todoDone : styles.todoPending}>
      <div className="flex flex-col sm:flex-row items items-center gap-4">
        <div
          onClick={() => onToggleTodo()}
          className={`
          flex p-2 rounded-md cursor-pointer
          hover:bg-op60
          ${todoOptimistic.complete ? 'bg-blue-100' : 'bg-red-100'}
          `}>
          {
            todoOptimistic.complete
              ? <IoCheckboxOutline size={30} />
              : <IoSquareOutline size={30} />
          }
        </div>
        <div className="text-center sm-text-left">
          {todoOptimistic.description}
        </div>
      </div>
    </div>
  )
}

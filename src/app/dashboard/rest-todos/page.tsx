export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getUserSessionServer } from '@/auth/actions/auth-actiones';
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { redirect } from 'next/navigation';


export const metadata = {
  title: 'To do list',
  description: 'To do list',
};

export default async function RestTodosPage() {

  const user = await getUserSessionServer();
  if ( !user ) redirect( '/api/auth/signin' );

  const todos = await prisma.todo.findMany( {
    where: { userId: user.id },
    orderBy: { description: 'asc' }
  } );

  return (
    <div>
      <div className="w-full px-3 mx-5 py-5">
        <NewTodo />
      </div>
      <TodosGrid todos={ todos } />
    </div>
  );
}
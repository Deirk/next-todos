import { getUserSessionServer } from '@/auth/actions/auth-actiones';
import prisma from '@/lib/prisma';
import { Todo } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import * as yup from 'yup';

interface Segments {
  params: {
    id: string;
  };
}

const getTodo = async ( id: string ): Promise<Todo | null> => {

  const user = await getUserSessionServer();

  if ( !user ) {
    return null;
  }


  const todo = await prisma.todo.findFirst( {
    where: { id }
  } );

  if ( todo?.userId !== user.id ) return null;

  return todo;
};

export async function GET( request: Request, { params }: Segments ) {

  const { id } = params;
  const todo = await getTodo( id );

  if ( !todo ) {
    return NextResponse.json(
      { message: `todo with id ${ id } not found` },
      { status: 404 }
    );
  };

  return NextResponse.json( {
    data: todo,
  } );
}

const putSchema = yup.object( {
  description: yup.string().optional(),
  complete: yup.boolean().optional()
} );


export async function PUT( request: Request, { params }: Segments ) {
  const user = await getUserSessionServer();

  if ( !user ) {
    return NextResponse.json( 'unauthorized', { status: 401 } );
  }


  try {

    const { id } = params;
    const { complete, description } = await putSchema.validate( await request.json() );
    const todo = await getTodo( id );

    if ( !todo ) {
      return NextResponse.json(
        { message: `todo with id ${ id } not found` },
        { status: 404 }
      );
    };

    const updatedTodo = await prisma.todo.update( {
      where: { id, userId: user.id },
      data: { complete, description }
    } );

    return NextResponse.json( {
      message: "todo updated",
      data: updatedTodo,
    } );

  } catch ( error ) {
    return NextResponse.json(
      { message: error },
      { status: 400 }
    );
  }
}
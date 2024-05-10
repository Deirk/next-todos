import { getUserSessionServer } from '@/auth/actions/auth-actiones';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import * as yup from 'yup';

export async function GET( request: Request ) {
  const { searchParams } = new URL( request.url );
  const take = Number( searchParams.get( 'take' ) ?? '10' );
  const skip = Number( searchParams.get( 'skip' ) ?? '0' );

  if ( isNaN( take ) || isNaN( skip ) ) {
    return NextResponse.json(
      { message: 'take or skip is not a number' },
      { status: 400 }
    );
  }

  const todos = await prisma.todo.findMany( {
    take: take,
    skip: skip
  } );

  return NextResponse.json( {
    data: todos,
  } );
}

const postSchema = yup.object( {
  description: yup.string().required(),
  complete: yup.boolean().optional().default( false )
} );

export async function POST( request: Request ) {
  const user = await getUserSessionServer();

  if ( !user ) {
    return NextResponse.json( 'unauthorized', { status: 401 } );
  }


  try {
    const { complete, description } = await postSchema.validate( await request.json() );

    const todo = await prisma.todo.create( { data: { complete, description, userId: user.id } } );

    return NextResponse.json( {
      message: 'Todo succesfuly created',
      data: todo
    } );
  } catch ( error ) {
    return NextResponse.json(
      { message: error },
      { status: 400 }
    );
  }

}

export async function DELETE( request: Request ) {
  const user = await getUserSessionServer();

  if ( !user ) {
    return NextResponse.json( 'unauthorized', { status: 401 } );
  }


  const todos = await prisma.todo.deleteMany( {
    where: { complete: true, userId: user.id }
  } );

  return NextResponse.json( {
    data: todos,
    message: 'Todos was successfully deleted'
  } );
}

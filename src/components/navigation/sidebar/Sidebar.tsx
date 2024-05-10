'use client'

import Image from "next/image";
import Link from "next/link";
import { SidebarItemType } from "./interfaces/sidebar-item";
import { IoBasketOutline, IoCalendarOutline, IoCheckboxOutline, IoCodeWorking, IoListOutline, IoPerson, IoPersonOutline } from "react-icons/io5";

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import { SidebarItem } from './SidebarItem';
import { LogoutButton } from './LogoutButton';

const menuItems: Array<SidebarItemType> = [
  {
    icon: <IoCalendarOutline size={ 30 } />,
    label: 'Dashboard',
    path: '/dashboard'
  },
  {
    icon: <IoCheckboxOutline size={ 30 } />,
    label: 'Rest TODOS',
    path: '/dashboard/rest-todos'
  },
  {
    icon: <IoListOutline size={ 30 } />,
    label: 'Server actions',
    path: '/dashboard/server-todos'
  },
  {
    icon: <IoCodeWorking size={ 30 } />,
    label: 'Cookies',
    path: '/dashboard/cookies'
  },
  {
    icon: <IoBasketOutline size={ 30 } />,
    label: 'Products',
    path: '/dashboard/products'
  },
  {
    icon: <IoPersonOutline size={ 30 } />,
    label: 'Profile',
    path: '/dashboard/profile'
  },
];

export const Sidebar = () => {

  const avatarUrl = "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp";

  const userName = 'no username';
  const userRoles = [ 'client' ];

  return (
    <>
      <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <div>
          <div className="-mx-6 px-6 py-4">
            <Link href="/dashboard" title="Dashboard">
              <Image src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg" width={ 100 } height={ 100 } className="w-32" alt="tailus logo" />
            </Link>
          </div>
          <div className="mt-8 text-center">
            <Image
              src={ avatarUrl }
              alt="Profile image"
              className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
              width={ 100 }
              height={ 100 } />
            <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{ userName }</h5>
            <span className="hidden text-gray-400 lg:block capitalize">{
              userRoles.join( ', ' )
            }</span>
          </div>

          <ul className="space-y-2 tracking-wide mt-8">
            {
              menuItems.map( menuItem => <SidebarItem key={ menuItem.path } { ...menuItem } /> )
            }
          </ul>
        </div>

        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <LogoutButton />
        </div>
      </aside>
    </>
  );
};

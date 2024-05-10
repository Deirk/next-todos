'use client';

import Link from "next/link"
import { SidebarItemType } from "./interfaces/sidebar-item"
import { usePathname } from "next/navigation";

const ACTIVE_STYLE = 'text-white bg-gradient-to-r from-sky-600 to-cyan-400'
const INACTIVE_STYLE = 'text-gray-600 group'

export const SidebarItem = ({icon, label, path}: SidebarItemType) => {

    const pathName = usePathname();

    return (
        <li>
            <Link href={path} className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl hover:bg-gradient-to-r hover:bg-sky-600 hover:text-white ${ pathName === path ? ACTIVE_STYLE : INACTIVE_STYLE}`}>
                {icon}
                <span className="-mr-1 font-medium">{label}</span>
            </Link>
        </li>
    )
}
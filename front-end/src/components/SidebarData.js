import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
  {
    title: 'Home',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Admin',
    path: '/admin',
    icon: <RiIcons.RiAdminLine />,
    cName: 'nav-text'
  },
  {
    title: 'Events',
    path: '/events',
    icon: <MdIcons.MdEvent />,
    cName: 'nav-text'
  },
  {
    title: 'Event management',
    path: '/eventmanagement',
    icon: <RiIcons.RiBriefcase4Line />,
    cName: 'nav-text'
  }
];
import React from 'react';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import { MenuItem } from '@/components/Layout/Header/NavBar/index';
import dropdown1058 from '@/assets/images/dropdown-1058.svg';

const SubMenu: React.FC<{ submenu: MenuItem[] }> = ({ submenu }) => (
    <>
        {submenu.map((item) => {
            const title = item?.title;
            const path = item?.path;
            return (
                <li
                    key={nanoid()}
                    className="submenu flex flex-row justify-start gap-2.5 items-center h-10 px-2.5 cursor-pointer hover:bg-[#EFEFEF] hover:rounded"
                >
                    <img src={dropdown1058} alt="" />
                    <Link to={path}>
                        <span className="navMenuItem font-bold text-gray-500  whitespace-nowrap">
                            {title}
                        </span>
                    </Link>
                </li>
            );
        })}
    </>
);

export default SubMenu;

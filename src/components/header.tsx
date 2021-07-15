import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Link from 'next/link';
import { useMe } from "../hooks/useMe";
import ctLogo from "../images/ikikn.jpg";

const Header:React.FC = () => {
    const { data } = useMe();
    
    return (
        <>
        {!data?.me.verified && (
            <div className="bg-red-500 p-3 text-center text-base text-white">
            <span>Please verify your email.</span>
            </div>
        )}
        <header className="py-4">
            <div className="w-full px-5 xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
            <Link href="/"> {/*왜 문제지 ~!!!!!!*/}
                {/* <img src={ctLogo} className="w-36" alt="Nuber Eats" /> */}
            </Link>
            <span className="text-xs">
                <Link href="/edit-profile">
                    User
                </Link>
            </span>
            </div>
        </header>
    </>
    );
}

export default Header
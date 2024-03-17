import React, { useState } from 'react';
import logo from '../assets/logo.png';
import moon from '../assets/icon-moon.svg';
import sun from '../assets/icon-sun.svg';
import profile from '../assets/image-avatar.jpg';
import useDarkMode from '../hooks/useDarkMode';
import { motion } from 'framer-motion';

function Header() {
    const [colorTheme, setTheme] = useDarkMode();
    const [darkSide, setDarkSide] = useState(colorTheme === 'light' ? true : false);

    const toggleDarkMode = () => {
        setTheme(colorTheme);
        setDarkSide((state) => !state);
    };

    const transition = {
        type: 'spring',
        stiffness: 200,
        damping: 10
    };

    return (
        <div className='h-[80px] w-full z-50 duration-300 ease-in-out p-4 dark:bg-[#1e2139] bg-[#373b53] flex items-center justify-end'>
            {/* Left Logo Image */}
            <img src={logo} alt="logo" className='h-[80px] absolute top-0 left-0' />

            {/* Right */}
            <div className='flex items-center'>
                {/* DarkMode Button */}
                {
                    colorTheme === 'light' ?
                        <motion.img
                            initial={{
                                scale: 0.6, rotate: 45
                            }}
                            animate={{
                                scale: 1,
                                rotate: 360,
                                transition
                            }}
                            whileTap={{
                                scale: 0.9, rotate: 15
                            }}
                            onClick={toggleDarkMode}
                            src={moon}
                            className='cursor-pointer ml-8 h-6'
                        />
                        :
                        <motion.img
                            initial={{
                                scale: 0.6, rotate: 45
                            }}
                            animate={{
                                scale: 1,
                                rotate: 360,
                                transition
                            }}
                            whileTap={{
                                scale: 0.9, rotate: 15
                            }}
                            onClick={toggleDarkMode}
                            src={sun}
                            className='cursor-pointer ml-8 h-6'
                        />
                }
                {/* Dotted Line */}
                <div className='h-[80px] border-dotted border-l border-[#494e6e] mx-6'></div>
                <div className='relative'>
                    <img src={profile} alt="profile" className='rounded-full h-16' />
                </div>
            </div>
        </div>
    );
}

export default Header;

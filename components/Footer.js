import React from 'react'

const Footer = () => {
    return (
        <footer className='bg-slate-900 border-t border-slate-800 text-slate-400 flex px-4 min-h-[52px] py-3 items-center justify-center text-sm'>
            <p className='text-center font-medium'>
                Copyright &copy; {new Date().getFullYear()} <span className="text-white font-semibold">CreatorFuel</span>. All rights reserved.
            </p>
        </footer>
    )
}

export default Footer
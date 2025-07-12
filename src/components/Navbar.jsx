import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-slate-400 p-4">
      <div className="logo">
        <span className="font-bold text-xl mx-9">
          MyTask
        </span>
      </div>
      <ul className="flex gap-10 mx-10">
        <li className="cursor-pointer hover:font-bold">Home</li>
        <li className="cursor-pointer hover:font-bold">Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
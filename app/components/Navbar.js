import Link from "next/link"

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full py-6 flex flex-row justify-around items-center">
            <Link className="font-bold hover:text-red-500 transition-all duration-500 text-gray-light" href={'/distance'}>Distance</Link>
            <Link className="font-bold hover:text-red-500 transition-all duration-500 text-gray-light" href={'/history'}>History</Link>
            <Link className="font-bold hover:text-red-500 transition-all duration-500 text-gray-light" href={'/about'}>About</Link>
            <Link className="font-bold hover:text-red-500 transition-all duration-500 text-gray-light" href={'/chat'}>Chat</Link>
        </nav>
    )
}

export default Navbar
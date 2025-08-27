import Link from "next/link"

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full py-6 flex flex-row justify-around items-center">
            <Link className="font-bold hover:text-red-500 transition-all duration-500" href={'/'}>Distance</Link>
            <Link className="font-bold hover:text-red-500 transition-all duration-500" href={'/history'}>History</Link>
            <Link className="font-bold hover:text-red-500 transition-all duration-500" href={'/report'}>Report</Link>
        </nav>
    )
}

export default Navbar
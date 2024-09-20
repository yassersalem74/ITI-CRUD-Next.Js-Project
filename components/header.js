import Link from "next/link";

function Header() {
  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl text-orange-500 font-bold">
          Blog
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/posts" className="font-bold text-gray-700 hover:text-orange-500 transition duration-300 no-underline">
              Posts
            </Link>
          </li>
          <li>
            <Link href="/posts/addPost" className="font-bold text-gray-700 hover:text-orange-500 transition duration-300 no-underline">
              Add Posts
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
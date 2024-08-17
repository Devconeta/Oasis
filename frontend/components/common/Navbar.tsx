'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

enum Routes {
  Home = '/',
  Papers = '/papers',
  Profile = '/profile',
}

const Navbar = () => {
  const route = usePathname();

  return (
    <nav className="absolute right-0 h-auto">
      <div className="flex justify-end items-center gap-14">
        {route === Routes.Home && (
          <Link href={Routes.Papers} className="animated-underline">
            Go to Papers
          </Link>
        )}

        {route === Routes.Papers && (
          <>
            <Link href={Routes.Home} className="animated-underline">
              Home
            </Link>

            <Link href={Routes.Profile} className="animated-underline">
              My Profile
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

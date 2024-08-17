'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ConnectButton,
  useActiveAccount,
  useActiveWallet,
  useDisconnect,
} from 'thirdweb/react';

import { thirdWebClient } from '@/common/services/thirdwebClient';
import { truncateAddress } from '@/common/utils/truncateAddress';
import Logout from '../icons/Logout';

enum Routes {
  Home = '/',
  Papers = '/papers',
  Profile = '/profile',
}

const Navbar = () => {
  const route = usePathname();
  const wallet = useActiveWallet();
  const account = useActiveAccount();
  const { disconnect } = useDisconnect();

  const onLogout = () => {
    if (!wallet) return;

    disconnect(wallet);
  };

  return (
    <nav className="absolute right-0 h-auto">
      <div className="flex justify-end items-center gap-14">
        {route === Routes.Home && (
          <Link href={Routes.Papers} className="animated-underline">
            Go to Papers
          </Link>
        )}

        {route === Routes.Papers && (
          <div className="flex items-center gap-6">
            <Link href={Routes.Home} className="animated-underline">
              Home
            </Link>

            {!account ? (
              <ConnectButton
                client={thirdWebClient}
                connectButton={{
                  label: 'Connect',
                  style: {
                    minHeight: '32px',
                    maxHeight: '32px',
                  },
                }}
              />
            ) : (
              <button
                className="flex items-center justify-center gap-2 h-[32px] px-4 rounded-md bg-white"
                onClick={onLogout}>
                <p className="text-xs font-semibold text-black">
                  {truncateAddress(account.address)}
                </p>

                <Logout />
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

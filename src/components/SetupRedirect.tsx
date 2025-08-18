"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface SetupRedirectProps {
  needsSetup: boolean;
}

export default function SetupRedirect({ needsSetup }: SetupRedirectProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Don't redirect if already on setup page
    if (pathname === '/setup') {
      return;
    }

    // Don't redirect if already on an API route
    if (pathname.startsWith('/api')) {
      return;
    }

    // If user needs setup, redirect to setup page
    if (needsSetup) {
      router.push('/setup');
    }
  }, [needsSetup, pathname, router]);

  // This component doesn't render anything
  return null;
}
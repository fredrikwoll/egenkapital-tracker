'use client'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import MobileNavigation from './MobileNavigation'
import { NavigationItem } from './Navigation'
import Sidebar from './Sidebar'
import {
  HomeIcon,
  CreditCardIcon,
  ChartBarIcon,
  BanknotesIcon,
  CogIcon
} from '@heroicons/react/24/solid'
import Image from 'next/image'
interface LayoutProps {
  children: React.ReactNode
}


export default function Layout({ children }: LayoutProps) {
  const [showQuickAdd, setShowQuickAdd] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const navigation: NavigationItem[] = [
    { name: 'Dashboard', href: '/', icon: HomeIcon, current: pathname === '/' },
    { name: 'Accounts', href: '/accounts', icon: CreditCardIcon, current: pathname === '/accounts' },
    { name: 'Records', href: '/records', icon: ChartBarIcon, current: pathname === '/records' },
    { name: 'Debt', href: '/debt', icon: CreditCardIcon, current: pathname === '/debt' },
    { name: 'Income', href: '/income', icon: BanknotesIcon, current: pathname === '/income' },
    { name: 'Settings', href: '/settings', icon: CogIcon, current: pathname === '/settings' },
  ]

  const handleQuickAdd = () => {
    setShowQuickAdd(true)
    // Navigate to records with add mode
    router.push('/records?add=true')
  }

  return (
    <div className="min-h-screen bg-main">
      {/* Desktop Sidebar */}
      <Sidebar navigation={navigation} />


      {/* Mobile Bottom Navigation */}
      <MobileNavigation 
        navigation={navigation} 
        handleQuickAdd={handleQuickAdd}
       />

      {/* Main Content */}
      <div className="lg:pl-20">
        {/* Header */}
        <div className="top-0 z-40 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                <Image src="/logo.svg" alt="Logo" width={160} height={80} />
              </h1>
            </div>
            
            {/* Desktop Quick Actions */}
{/*             <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={handleQuickAdd}
                className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-primary text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Record
              </button>
            </div> */}
          </div>
        </div>

        {/* Page Content */}
        <main className="px-4 py-6 sm:px-6 lg:px-8 pb-20 lg:pb-6">
          {children}
        </main>
      </div>
    </div>
  )
}


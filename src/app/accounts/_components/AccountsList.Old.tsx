'use client'
import { useState } from 'react'
import { createAccount, updateAccount, deleteAccount } from '@/lib/api'

interface Account {
  id: string
  name: string
  type: string
}

interface Props {
  initialData: Account[]
}

export function AccountsListOld({ initialData }: Props) {
  const [accounts, setAccounts] = useState(initialData) // ← Start med server data
  const [isLoading, setIsLoading] = useState(false);
  
    const handleCreate = async (data) => {
    setIsLoading(true)
    try {
      const newAccount = await createAccount(data) // ← API call
      setAccounts(prev => [newAccount, ...prev]) // ← Optimistic update
    } catch (error) {
      console.error('Failed to create account')
    } finally {
      setIsLoading(false)
    }
  }

    const handleUpdate = async (id, updates) => {
    // Optimistic update
    setAccounts(prev => 
      prev.map(acc => acc.id === id ? { ...acc, ...updates } : acc)
    )
    
    try {
      await updateAccount(id, updates) // ← API call
    } catch (error) {
      // Revert on error
      setAccounts(initialData)
    }
  }

  return (
    <div className="space-y-4">
      {accounts.map(account => (
        <div key={account.id} className="bg-card p-4 rounded">
          <h3 className="text-text-primary">{account.name}</h3>
          <p className="text-text-muted">{account.type}</p>
        </div>
      ))}
    </div>
  )
}
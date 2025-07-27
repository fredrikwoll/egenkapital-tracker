'use client'
import { useState } from 'react'

export default function ExpandableTable() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editFormData, setEditFormData] = useState({ name: '', amount: '', type: 'SAVINGS' })
  const [addFormData, setAddFormData] = useState({ name: '', amount: '', type: 'SAVINGS' })

  // Static data
  const accounts = [
    { id: '1', name: 'Savings Account', amount: 50000, type: 'SAVINGS' },
    { id: '2', name: 'Checking Account', amount: 15000, type: 'CHECKING' },
    { id: '3', name: 'Investment Account', amount: 125000, type: 'INVESTMENT' },
  ]

  const handleEdit = (account: any) => {
    if (expandedId === account.id) {
      setExpandedId(null)
    } else {
      setShowAddForm(false)
      setExpandedId(account.id)
      setEditFormData({
        name: account.name,
        amount: account.amount.toString(),
        type: account.type
      })
    }
  }

  const handleAddNew = () => {
    setExpandedId(null)
    setShowAddForm(!showAddForm)
    if (!showAddForm) {
      setAddFormData({ name: '', amount: '', type: 'SAVINGS' })
    }
  }

  const handleSaveEdit = () => {
    console.log('Saving edit:', editFormData)
    setExpandedId(null)
  }

  const handleSaveAdd = () => {
    console.log('Creating new account:', addFormData)
    setShowAddForm(false)
    setAddFormData({ name: '', amount: '', type: 'SAVINGS' })
  }

  const handleCancelEdit = () => {
    setExpandedId(null)
  }

  const handleCancelAdd = () => {
    setShowAddForm(false)
    setAddFormData({ name: '', amount: '', type: 'SAVINGS' })
  }

  return (
    <div className="bg-border rounded-lg shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-medium text-text-primary">Accounts</h2>
          <p className="text-sm text-gray-500 mt-1">
            {accounts.length} account{accounts.length !== 1 ? 's' : ''} • Total: {accounts.reduce((sum, acc) => sum + acc.amount, 0).toLocaleString()} kr
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-blue-600 text-text-primary text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden sm:inline">Add Account</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      {/* Add New Form */}
      {showAddForm && (
        <div className="border-b border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="px-4 md:px-6 py-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-base font-medium text-text-primary">Create New Account</h3>
            </div>
            
            <div className="max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-text-primary mb-2">
                    Account Name *
                  </label>
                  <input
                    type="text"
                    value={addFormData.name}
                    onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-input-bg"
                    placeholder="e.g. Emergency Fund"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-primary mb-2">
                    Account Type
                  </label>
                  <select
                    value={addFormData.type}
                    onChange={(e) => setAddFormData({ ...addFormData, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-input-bg"
                  >
                    <option value="SAVINGS">Savings</option>
                    <option value="CHECKING">Checking</option>
                    <option value="INVESTMENT">Investment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-primary mb-2">
                    Initial Amount
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={addFormData.amount}
                      onChange={(e) => setAddFormData({ ...addFormData, amount: e.target.value })}
                      className="w-full px-3 py-2 pr-8 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-input-bg"
                      placeholder="0"
                    />
                    <span className="absolute right-3 top-2 text-sm text-gray-500">kr</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={handleSaveAdd}
                  disabled={!addFormData.name.trim()}
                  className="px-4 py-2 bg-blue-600 text-text-primary text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Create Account
                </button>
                <button
                  onClick={handleCancelAdd}
                  className="px-4 py-2 text-gray-600 text-sm font-medium hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Table View */}
      <div className="hidden md:block divide-y divide-gray-50">
        {accounts.map((account) => (
          <div key={account.id}>
            {/* Main Row */}
            <div 
              className="group hover:bg-gray-25 transition-colors cursor-pointer"
              onClick={() => handleEdit(account)}
            >
              <div className="flex items-center justify-between py-4 px-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-sm font-medium text-text-primary">
                      {account.name}
                    </h3>
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full capitalize">
                      {account.type.toLowerCase()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-mono text-text-primary">
                    {account.amount.toLocaleString()} kr
                  </span>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEdit(account)
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600 rounded"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <svg 
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        expandedId === account.id ? 'rotate-180' : ''
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Form */}
            {expandedId === account.id && (
              <div className="bg-card border-t border-gray-100 px-6 py-4 animate-in slide-in-from-top-2 duration-200">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <h4 className="text-base font-medium text-text-primary">Edit Account</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-text-primary mb-2">
                        Account Name
                      </label>
                      <input
                        type="text"
                        value={editFormData.name}
                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-input-bg"
                        placeholder="Enter account name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-text-primary mb-2">
                        Account Type
                      </label>
                      <select
                        value={editFormData.type}
                        onChange={(e) => setEditFormData({ ...editFormData, type: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-input-bg"
                      >
                        <option value="SAVINGS">Savings</option>
                        <option value="CHECKING">Checking</option>
                        <option value="INVESTMENT">Investment</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-text-primary mb-2">
                        Current Amount
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={editFormData.amount}
                          onChange={(e) => setEditFormData({ ...editFormData, amount: e.target.value })}
                          className="w-full px-3 py-2 pr-8 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-input-bg"
                          placeholder="0"
                        />
                        <span className="absolute right-3 top-2 text-sm text-gray-500">kr</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-6">
                    <button
                      onClick={handleSaveEdit}
                      className="px-4 py-2 bg-blue-600 text-text-primary text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 text-text-primary border border-color-text-text-primary text-sm font-medium rounded-md hover:text-text-secondary transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-gray-50">
        {accounts.map((account) => (
          <div key={account.id}>
            {/* Mobile Card */}
            <div 
              className="p-4 hover:bg-gray-25 transition-colors cursor-pointer"
              onClick={() => handleEdit(account)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-text-primary truncate">
                    {account.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-lg font-mono text-text-primary">
                      {account.amount.toLocaleString()} kr
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full capitalize">
                      {account.type.toLowerCase()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEdit(account)
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <svg 
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      expandedId === account.id ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Mobile Edit Form */}
            {expandedId === account.id && (
              <div className="bg-card border-t border-gray-100 px-4 py-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <h4 className="text-base font-medium text-text-primary">Edit Account</h4>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-text-primary mb-2">
                      Account Name
                    </label>
                    <input
                      type="text"
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-input-bg"
                      placeholder="Enter account name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-text-primary mb-2">
                      Account Type
                    </label>
                    <select
                      value={editFormData.type}
                      onChange={(e) => setEditFormData({ ...editFormData, type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-input-bg"
                    >
                      <option value="SAVINGS">Savings</option>
                      <option value="CHECKING">Checking</option>
                      <option value="INVESTMENT">Investment</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-text-primary mb-2">
                      Current Amount
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={editFormData.amount}
                        onChange={(e) => setEditFormData({ ...editFormData, amount: e.target.value })}
                        className="w-full px-3 py-2 pr-8 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-input-bg"
                        placeholder="0"
                      />
                      <span className="absolute right-3 top-2 text-sm text-gray-500">kr</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    onClick={handleSaveEdit}
                    className="flex-1 px-4 py-2 bg-blue-600 text-text-primary text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex-1 px-4 py-2 text-gray-600 text-sm font-medium hover:text-gray-800 transition-colors border border-gray-200 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {accounts.length === 0 && (
        <div className="py-12 text-center">
          <div className="text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-sm text-gray-500 mb-2">No accounts yet</p>
            <button 
              onClick={handleAddNew}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Create your first account
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Home, Search, User, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import FeedView from './feed-view'
import SearchView from './search-view'
import ProfileView from './profile-view'

export default function ActuClips() {
  const [currentView, setCurrentView] = useState('feed')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (currentView !== 'search') {
      setIsSearchOpen(false)
    }
  }, [currentView])

  const renderView = () => {
    switch (currentView) {
      case 'feed':
        return <FeedView />
      case 'search':
        return <SearchView initialSearchTerm={searchTerm} />
      case 'profile':
        return <ProfileView />
      default:
        return <FeedView />
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      setCurrentView('search')
    }
  }

  const handleNavigation = (view: string) => {
    if (view === 'search') {
      setIsSearchOpen(true)
      setCurrentView('search')
    } else {
      setCurrentView(view)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
      <div className="bg-white border-t border-gray-200">
        <AnimatePresence>
          {isSearchOpen && (
            <motion.form
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="px-4 py-2 space-y-2"
              onSubmit={handleSearchSubmit}
            >
              <div className="flex items-center">
                <Input
                  type="text"
                  placeholder="Search for news..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => {
                    setIsSearchOpen(false)
                    if (currentView === 'search') {
                      setCurrentView('feed')
                    }
                  }} 
                  className="ml-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Button type="submit" className="w-full">
                Search
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
        <nav className="flex justify-around items-center h-16">
          <button
            onClick={() => handleNavigation('feed')}
            className={`p-2 rounded-full ${currentView === 'feed' ? 'bg-primary text-primary-foreground' : 'text-gray-600'}`}
          >
            <Home size={24} />
          </button>
          <button
            onClick={() => handleNavigation('search')}
            className={`p-2 rounded-full ${currentView === 'search' || isSearchOpen ? 'bg-primary text-primary-foreground' : 'text-gray-600'}`}
          >
            <Search size={24} />
          </button>
          <button
            onClick={() => handleNavigation('profile')}
            className={`p-2 rounded-full ${currentView === 'profile' ? 'bg-primary text-primary-foreground' : 'text-gray-600'}`}
          >
            <User size={24} />
          </button>
        </nav>
      </div>
    </div>
  )
}
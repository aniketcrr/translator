import React from 'react'

function Header() {
    return (
        <header className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-3 text-text-light dark:text-text-dark">
                <div className="flex items-center justify-center size-8 bg-primary/20 text-primary rounded-lg">
                    <span className="material-symbols-outlined text-lg">translate</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight">TranslateNow</h1>
            </div>
        </header>
    )
}

export default Header

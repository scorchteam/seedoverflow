if (localStorage.getItem('darkmode') === 'true' || (!('darkmode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    console.log("dark is set in storage")
    document.documentElement.classList.add('dark')
} else {
    document.documentElement.classList.remove('dark')
}
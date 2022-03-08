import type { NextPage } from 'next'

/**
 * Home page
 * @returns Home page
 */
const Home: NextPage = () => {
  return (
    <div className="bg-dark-mode-dark-background h-full p-4 flex justify-around">
      <div className="bg-dark-mode-lighter-dark-background h-full rounded-lg p-4 container">
        Content
      </div>
    </div>
  )
}

export default Home

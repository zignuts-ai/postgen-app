// ** MUI Imports

import { ReactNode, useEffect } from 'react'

import { useSettings } from 'src/@core/hooks/useSettings'
import BlankLayoutWithAppBar from 'src/@core/layouts/BlankLayoutWithAppBar'
import DashboardView from 'src/views/dashboard/dashboard-view'
import Download from 'src/views/landing/Download'
import Faq from 'src/views/landing/Faq'
import Features from 'src/views/landing/Features'
import Footer from 'src/views/landing/Footer'
import Hero from 'src/views/landing/Hero'

const Home = () => {
  const { settings, saveSettings } = useSettings()

  useEffect(() => {
    saveSettings({ ...settings, mode: 'dark' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className='overflow-hidden'>
      <section className='relative pt-20 pb-20 max-lg:pt-52 max-lg:pb-10 max-md:pt-36 max-md:pb-32 bg-primary'>
        <DashboardView />
      </section>
      <Hero />
      <Features />
      <Faq />
      <Download />
      <Footer />
    </main>
  )
}

Home.getLayout = (page: ReactNode) => <BlankLayoutWithAppBar>{page}</BlankLayoutWithAppBar>

Home.publicGuard = true

export default Home

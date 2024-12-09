// ** MUI Imports

import { ReactNode, useEffect } from 'react'

import { useSettings } from 'src/@core/hooks/useSettings'
import BlankLayoutWithAppBar from 'src/@core/layouts/BlankLayoutWithAppBar'
import DashboardView from 'src/views/dashboard/dashboard-view'
import Usercase from 'src/components/landingcomponents/usercase'
import Section from 'src/components/landingcomponents/section'
import Feature from 'src/components/landingcomponents/feature'
import Testimonial from 'src/components/landingcomponents/testimonial'
import Footer from 'src/components/landingcomponents/footer'
import Cta from 'src/components/landingcomponents/cta'
import Faq from 'src/components/landingcomponents/faq'
import { LANDING_DATA } from 'src/constants/fakeData'
import Hero from 'src/components/landingcomponents/hero'

const Home = () => {
  const { settings, saveSettings } = useSettings()

  useEffect(() => {
    saveSettings({ ...settings, mode: 'dark' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className='overflow-hidden'>
      <section className='relative pb-20 max-lg:pb-10 pt-14 md:pt-20 lg:pt-28 bg-[#010101]'>
        <DashboardView />
      </section>
      {LANDING_DATA.hero && <Hero />}
      {LANDING_DATA.usercase && <Usercase />}
      {LANDING_DATA.section && <Section />}
      {LANDING_DATA.feature && <Feature />}
      {LANDING_DATA.testimonial && <Testimonial />}
      {LANDING_DATA.faq && <Faq />}
      {LANDING_DATA.cta && <Cta />}
      {LANDING_DATA.footer && <Footer />}
    </main>
  )
}

Home.getLayout = (page: ReactNode) => <BlankLayoutWithAppBar>{page}</BlankLayoutWithAppBar>

Home.publicGuard = true

export default Home

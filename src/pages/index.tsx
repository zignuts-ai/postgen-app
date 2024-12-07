// ** MUI Imports
import { Grid } from '@mui/material'
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
      <Grid container spacing={6} justifyContent='center' alignItems='center'>
        <Grid item xs={10}>
          <DashboardView />
        </Grid>
      </Grid>
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

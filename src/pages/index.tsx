// ** MUI Imports
import { Grid } from '@mui/material'
import { ReactNode } from 'react'
import BlankLayoutWithAppBar from 'src/@core/layouts/BlankLayoutWithAppBar'
import DashboardView from 'src/views/dashboard/dashboard-view'
import Download from 'src/views/landing/Download'
import Faq from 'src/views/landing/Faq'
import Features from 'src/views/landing/Features'
import Footer from 'src/views/landing/Footer'
import Hero from 'src/views/landing/Hero'

const Home = () => {
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

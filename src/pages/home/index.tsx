// ** MUI Imports
import { Grid } from '@mui/material'
import DashboardView from 'src/views/dashboard/dashboard-view'

const Home = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <DashboardView />
      </Grid>
    </Grid>
  )
}

export default Home

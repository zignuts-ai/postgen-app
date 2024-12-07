import React from 'react'
import { Grid } from '@mui/material'
import DashboardView from 'src/views/dashboard/dashboard-view'

const NewChatPage = () => {
  return (
    <Grid container spacing={6} justifyContent='center' alignItems='center'>
      <Grid item xs={10}>
        <DashboardView />
      </Grid>
    </Grid>
  )
}

NewChatPage.publicGuard = true

export default NewChatPage

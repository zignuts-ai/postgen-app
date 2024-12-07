// ** MUI Imports
import Grid from '@mui/material/Grid'
import UserList from 'src/components/common/form/Usermanagment'

const SecondPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserList />
      </Grid>
    </Grid>
  )
}

export default SecondPage

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'

type Props = {
  tab: string
  invoiceData: InvoiceType[]
}

const UserView = ({}: Props) => {
  return (
    <Grid container spacing={6}>
      {/* <Grid item xs={12} md={5} lg={4}>
        <UserViewLeft />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <UserViewRight tab={tab} invoiceData={invoiceData} />
      </Grid> */}
    </Grid>
  )
}

export default UserView

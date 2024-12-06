// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import { Button } from '@mui/material'
import useModal from 'src/hooks/useModal'
import { Icon } from '@iconify/react'
import AddDBmodal from 'src/view/dashboard/AddDBmodal'



const Home = () => {
  const { isOpen, openModal, closeModal } = useModal()


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}></Grid>
      <Card
        sx={{
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          '&:hover': {
            '& $arrowIcon': {
              transform: 'translateX(4px)'
            }
          }
        }}
        onClick={openModal}
      >
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center'
          }}
        >
          <Button variant='contained' endIcon={<Icon icon='material-symbols:add' />}>
            Create Dashboard
          </Button>
        </CardContent>
        <AddDBmodal isOpen={isOpen} closeModal={closeModal} />
      </Card>
    </Grid>
  )
}

export default Home

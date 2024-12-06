// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface TableHeaderProps {
  value: string
  toggle: () => void
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter, toggle, value } = props

  return (
    <Box
      sx={{ p: 6, gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
    >
      <TextField size='small' value={value} placeholder='Search User' onChange={e => handleFilter(e.target.value)} />

      <Button onClick={toggle} variant='contained'>
        Add User
      </Button>
    </Box>
  )
}

export default TableHeader

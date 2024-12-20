import React, { useState } from 'react'
import {
  Menu as MUIMenu,
  MenuItem,
  MenuList,
  Divider,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Radio,
  Popper,
  ClickAwayListener,
  Paper,
  Grow
} from '@mui/material'
import { Check as CheckIcon, ChevronRight as ChevronRightIcon, Circle as CircleIcon } from '@mui/icons-material'

// Main Dropdown Menu context
export const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const contextValue = {
    anchorEl,
    setAnchorEl,
    open,
    handleClose
  }

  return <DropdownMenuContext.Provider value={contextValue as any}>{children}</DropdownMenuContext.Provider>
}

// Context for managing dropdown state
const DropdownMenuContext = React.createContext({
  anchorEl: null,
  setAnchorEl: () => {},
  open: false,
  handleClose: () => {}
})

// Trigger component
export const DropdownMenuTrigger = React.forwardRef(({ children, ...props }: any, ref) => {
  const { setAnchorEl } = React.useContext(DropdownMenuContext)

  const handleClick = (event: any) => {
    // @ts-ignore
    setAnchorEl(event.currentTarget)
  }

  return React.cloneElement(children, {
    ref,
    onClick: handleClick,
    ...props
  })
})

// Content component
export const DropdownMenuContent = ({ children, ...props }: any) => {
  const { anchorEl, open, handleClose } = React.useContext(DropdownMenuContext)

  return (
    <Popper open={open} anchorEl={anchorEl} placement='bottom-start' transition {...props}>
      {({ TransitionProps }) => (
        <Grow {...TransitionProps}>
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList>{children}</MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  )
}

// Menu Item
export const DropdownMenuItem = React.forwardRef(({ children, inset, onClick, ...props }: any, ref) => {
  const { handleClose } = React.useContext(DropdownMenuContext)

  const handleItemClick = (event: any) => {
    onClick?.(event)
    handleClose()
  }

  return (
    <MenuItem
      ref={ref}
      onClick={handleItemClick}
      sx={{
        ...(inset && { paddingLeft: 4 }),
        minWidth: 160
      }}
      {...props}
    >
      {children}
    </MenuItem>
  )
})

// Checkbox Item
export const DropdownMenuCheckboxItem = ({ children, checked, onCheckedChange, ...props }: any) => {
  const [isChecked, setIsChecked] = useState(checked)

  const handleChange = () => {
    const newChecked = !isChecked
    setIsChecked(newChecked)
    onCheckedChange?.(newChecked)
  }

  return (
    <MenuItem {...props} onClick={handleChange}>
      <ListItemIcon>
        <Checkbox edge='start' checked={isChecked} tabIndex={-1} disableRipple />
      </ListItemIcon>
      <ListItemText primary={children} />
    </MenuItem>
  )
}

// Radio Item
export const DropdownMenuRadioItem = ({ children, value, onSelect, ...props }: any) => {
  return (
    <MenuItem {...props}>
      <ListItemIcon>
        <Radio edge='start' checked={value} tabIndex={-1} disableRipple />
      </ListItemIcon>
      <ListItemText primary={children} />
    </MenuItem>
  )
}

// Separator
export const DropdownMenuSeparator = () => <Divider />

// Label
export const DropdownMenuLabel = ({ children, ...props }: any) => (
  <MenuItem disabled {...props}>
    <ListItemText primary={children} />
  </MenuItem>
)

// Shortcut
export const DropdownMenuShortcut = ({ children, ...props }: any) => (
  <span style={{ marginLeft: 'auto', opacity: 0.6, fontSize: '0.75rem' }} {...props}>
    {children}
  </span>
)

// Submenu components (simplified)
export const DropdownMenuSub = ({ children }: any) => {
  const [anchorEl, setAnchorEl] = useState(null)

  return (
    <DropdownSubMenuContext.Provider value={{ anchorEl, setAnchorEl } as any}>
      {children}
    </DropdownSubMenuContext.Provider>
  )
}

const DropdownSubMenuContext = React.createContext({
  anchorEl: null,
  setAnchorEl: () => {}
})

export const DropdownMenuSubTrigger = ({ children, ...props }: any) => {
  const { setAnchorEl } = React.useContext(DropdownSubMenuContext)

  return (
    <>
      {/* @ts-ignore */}
      <MenuItem onClick={e => setAnchorEl(e.currentTarget)} {...props}>
        {children}
        <ChevronRightIcon style={{ marginLeft: 'auto' }} />
      </MenuItem>
    </>
  )
}

export const DropdownMenuSubContent = ({ children, ...props }: any) => {
  const { anchorEl } = React.useContext(DropdownSubMenuContext)

  return (
    <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement='right-start' {...props}>
      <Paper>
        <MenuList>{children}</MenuList>
      </Paper>
    </Popper>
  )
}

// Group and RadioGroup (simplified)
export const DropdownMenuGroup = ({ children }: any) => <MenuList>{children}</MenuList>

export const DropdownMenuRadioGroup = ({ value, onValueChange, children }: any) => {
  const [selectedValue, setSelectedValue] = useState(value)

  const handleChange = (newValue: any) => {
    setSelectedValue(newValue)
    onValueChange?.(newValue)
  }

  return (
    <MenuList>
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          value: selectedValue === child.props.value,
          onSelect: () => handleChange(child.props.value)
        })
      )}
    </MenuList>
  )
}

// Example usage
export const DropdownMenuExample = () => (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <button>Open Menu</button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

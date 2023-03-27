import { useState } from 'react'
import { AppBar, Avatar, Button, Link, Menu, MenuItem, styled, Toolbar, Typography } from '@mui/material'
import { UserDto } from '../../api'
import { spacing } from '../../styles/spacing'

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
`

const StyledBrandLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.common.white};
`

const StyledAccountInfo = styled(Button)`
  color: ${({ theme }) => theme.palette.common.white};
  display: flex;
  gap: ${spacing(1)};
`

const StyledAvatar = styled(Avatar)`
  width: 30px;
  height: 30px;
`

type TopPanelProps = {
  user: UserDto
  logout: () => void
}

const TopPanel = ({ user, logout }: TopPanelProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onLogoutClick = () => {
    handleClose()
    logout()
  }

  return (
    <AppBar position='fixed'>
      <StyledToolbar>
        <StyledBrandLink href='/'>
          <Typography variant='h6'>Notum Nodes</Typography>
        </StyledBrandLink>
        <StyledAccountInfo onClick={handleOpen}>
          <StyledAvatar />
          {user.username}
        </StyledAccountInfo>
        <Menu
          id='account-menu'
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          elevation={2}
        >
          <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
        </Menu>
      </StyledToolbar>
    </AppBar>
  )
}

export default TopPanel

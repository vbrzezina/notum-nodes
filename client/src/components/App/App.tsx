import { Stack } from '@mui/material'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetMe } from '../../api'
import Main from './Main'
import TopPanel from './TopPanel'

export default function App() {
  const navigate = useNavigate()
  const { data: user, remove } = useGetMe()

  const logout = () => {
    Cookies.remove('access_token')
    remove()
    navigate('/login')
  }

  // FIXME: Use new react-router 6 loader actions
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  if (!user) {
    return null
  }

  return (
    <Stack flex={1}>
      <Stack direction='column' flex={1}>
        <TopPanel user={user} logout={logout} />
        <Main />
      </Stack>
    </Stack>
  )
}

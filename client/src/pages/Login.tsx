import { yupResolver } from '@hookform/resolvers/yup'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { LoadingButton } from '@mui/lab'
import { Alert, Avatar, Card, CardContent, Container, Grid, Stack, styled, Typography } from '@mui/material'
import Cookies from 'js-cookie'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { TextFieldElement } from 'react-hook-form-mui'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { LoginDto, useGetMe, useLogin } from '../api'

const StyledLoginContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    max-width: 500px;
  }
`

/**
 * Component for displaying the login form. It has 2 text fields for username and password and a button for submitting the form.
 * If the login is not successful, there should be message "Invalid credentials.".
 */
export default function Login() {
  const navigate = useNavigate()

  const schema: Yup.ObjectSchema<LoginDto> = useMemo(
    () =>
      Yup.object({
        username: Yup.string().required(),
        password: Yup.string().required(),
      }),
    [],
  )

  const { control, handleSubmit } = useForm<LoginDto>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
  })

  const { mutate, isLoading, isError } = useLogin()

  const { data: user, refetch } = useGetMe({
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  const submit = (LoginDto: LoginDto) => {
    mutate(
      { LoginDto },
      {
        onSuccess(data) {
          Cookies.set('access_token', data.access_token)
          refetch()
          navigate('/')
        },
      },
    )
  }

  // FIXME: Use new react-router 6 loader actions
  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  if (user) {
    return null
  }

  return (
    <StyledLoginContainer>
      <Card>
        <CardContent>
          <Stack direction='column' p={3} gap={3}>
            <Stack direction='column' alignItems='center' gap={2}>
              <Avatar>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component='h1' variant='h5'>
                Sign in
              </Typography>
            </Stack>
            {isError ? <Alert severity='error'>Login error</Alert> : null}
            <form onSubmit={handleSubmit(submit)} noValidate>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextFieldElement control={control} fullWidth name='username' label='Username' required />
                </Grid>
                <Grid item xs={12}>
                  <TextFieldElement
                    control={control}
                    fullWidth
                    type='password'
                    name='password'
                    label='Password'
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <LoadingButton loading={isLoading} type='submit' size='large' fullWidth variant='contained'>
                    Submit
                  </LoadingButton>
                </Grid>
              </Grid>
            </form>
          </Stack>
        </CardContent>
      </Card>
    </StyledLoginContainer>
  )
}

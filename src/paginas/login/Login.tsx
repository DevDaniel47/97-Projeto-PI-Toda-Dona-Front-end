import React, { ChangeEvent, useState, useEffect } from 'react'
import { Grid, Typography, TextField, Button } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import useLocalStorage from 'react-use-localstorage'
import VendedoraLogin from '../../models/VendedoraLogin'
import { login } from '../../services/Service'
import './Login.css'

function Login() {
  let navigate = useNavigate()
  const [token, setToken] = useLocalStorage('token')
  const [vendedoraLogin, setVendedoraLogin] = useState<VendedoraLogin>({
    id: 0,
    cpf: '',
    senha: '',
    token: ''
  })

  useEffect(() => {
    if (token !== '') {
      navigate('/home')
    }
  }, [token])

  function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    setVendedoraLogin({
      ...vendedoraLogin,
      [e.target.name]: e.target.value
    })
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('VendedoraLogin: ' + Object.values(vendedoraLogin))
    try {
      await login(`/vendedora/logar`, vendedoraLogin, setToken)
      alert('Login realizado com sucesso. Bem Vinda de Volta!')
    } catch (error) {
      alert('Dados inválidos. Erro no login. Por favor, tente novamente.')
    }
  }

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" className='Login'>
      {/* 1° tela do login  */}
      <Grid alignItems="center" xs={8} className='card'>
        <Box paddingX={20} paddingY={20}>
          <form onSubmit={onSubmit}>
            <Typography
              variant="h3"
              component="h3"
              align="center"
              gutterBottom
              className='entrar'
            >
              {' '}
              Entrar
            </Typography>
            <TextField
              value={vendedoraLogin.cpf}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="cpf"
              label="CPF"
              variant="outlined"
              name="cpf"
              margin="normal"
              fullWidth
              className='fundoTexto'
            />
            <TextField
              value={vendedoraLogin.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="senha"
              label="Senha"
              variant="outlined"
              name="senha"
              margin="normal"
              type="password"
              fullWidth
              className='fundoTexto'
            />

            {/* botão de login */}
            <Box marginTop={2} textAlign="center">
              <Button
                className="button-logar"
                type="submit"
                variant="contained"
                color="primary"
              >
                {' '}
                Logar{' '}
              </Button>
            </Box>
          </form>

          <Box display="flex" justifyContent="center" marginTop={2}>
            <Box marginRight={1}>
              <Typography variant="subtitle1" align="center" gutterBottom>
                Não tem uma conta?
              </Typography>
            </Box>
            <Link to="/cadastro">
              <Typography
                variant="subtitle1"
                align="center"
                style={{ fontWeight: 'bold' }}
                gutterBottom
              >
                Cadastre-se
              </Typography>
            </Link>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
export default Login

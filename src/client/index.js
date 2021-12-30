import App from './app'

export const connect = ()=>{
  const socket = window.io()
  App(socket)
}

connect()

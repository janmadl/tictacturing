import React from 'react'
import ReactDOM from 'react-dom'
import {Router, browserHistory, applyRouterMiddleware} from 'react-router'
import Routes from './routes'
import Relay from 'react-relay'
import useRelay from 'react-router-relay'
import {
  RelayNetworkLayer,
  urlMiddleware
} from 'react-relay-network-layer'
import {relayApiUrl} from './config/urls'
import auth from './utils/auth'

const createHeaders = (idToken) => {
  if (idToken) {
    return {
      Authorization: 'Bearer ' + idToken
    }
  } else {
    return {}
  }
}

Relay.injectNetworkLayer(
  new RelayNetworkLayer([
    urlMiddleware({
      url: (req) => relayApiUrl,
    }),
    next => req => {
      let idToken = auth.getToken()
      let headers = createHeaders(idToken)
      req.headers = {
        ...req.headers,
        ...headers
      }
      return next(req)
    },
  ],{ disableBatchQuery: true })
)

ReactDOM.render(
  <div>
    <h1>Hello there!</h1>
  </div>,
  document.getElementById('root')
)

import app from 'ampersand-app'
import Router from 'ampersand-router'
import React from 'react'
import qs from 'qs'
import xhr from 'xhr'
import Layout from './layout'
import PublicPage from './pages/public'
import ReposPage from './pages/repos'

export default Router.extend({
    renderPage(page, opts = {layout: true}) {
        if (opts.layout) {
            page = (<Layout>
                {page}
            </Layout>)
        }

        React.render(page, document.body)
    },

    routes: {
        '': 'public',
        'repos': 'repos',
        'login': 'login',
        'auth/callback?:query': 'authCallback'
    },

    public() {
        this.renderPage(<PublicPage />, {layout:false})
    },

    repos() {
        this.renderPage(<ReposPage />)
    },

    login() {
        window.location = `https://github.com/login/oauth/authorize?${qs.stringify({
            client_id: '758e8cc31549749d05c3',
            redirect_uri: `${window.location.origin}/auth/callback`,
            scope: 'user, repo',
        })}`
    },

    authCallback(query) {
        query = qs.parse(query)

        xhr({
            url: `https://blooming-escarpment-36179.herokuapp.com/authenticate/${query.code}`,
            json: true
        }, (err, req, body) => {
            app.me.token = body.token
        })
    }
})
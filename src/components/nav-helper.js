import app from 'ampersand-app'
import React from 'react'
import localLinks from 'local-links'

export default React.createClass({
    onClick(evt) {
      const pathname = localLinks.getLocalPathname(evt)

      if (pathname) {
        evt.preventDefault()

        app.router.history.navigate(pathname)
      }
    },

    render() {
        return (
            <div {...this.props} onClick={this.onClick}>
                {this.props.children}
            </div>
        )
    }
})

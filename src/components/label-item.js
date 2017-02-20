import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'

export default React.createClass({
    mixins: [ampersandMixin],

    onEditClick(evt) {
        evt.preventDefault()
        this.props.label.destroy()
    },

    onCancelClick(evt) {
        this.props.label.editing = false
    },

    onDeleteClick(evt) {
        this.props.label
    },

    render() {
        const {label} = this.props
        const cssColor = `#${label.color}`
        let content

        if (label.editing) {
            content = (
            <form className='label'>
                <span className='label-color avatar avatar-small avatar-rounded'>&nbsp;</span>
                <input name='name'/>
                <input name='color'/>
                <button type='submit' className='button button-small'>Save</button>
                <button type='button' className='button button-small button-unstyled' onClick={this.onCancelClick}>cancel</button>
            </form>
            )
        } else {
            content = (
            <div className='label'>
                <span className='label-color' style={{ backgroundColor: cssColor }}>&nbsp;</span>
                <span>{label.name}</span>
                <span className='octicon octicon-pencil' onClick={this.onEditClick}></span>
                <span className='octicon octicon-x' onClick={this.onDeleteClick}></span>
            </div>
            )
        }

        return (
            <div>{content}</div>
        )
    }
})

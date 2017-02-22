import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'

export default React.createClass({
    mixins: [ampersandMixin],

    onEditClick(evt) {
        this.props.label.editing = true
    },

    onCancelClick(evt) {
        evt.preventDefault()
        this.props.label.editing = false
        this.setState(this.getInitialState())
    },

    onDeleteClick(evt) {
        evt.preventDefault()
        this.props.label.destroy()
    },

    getInitialState() {
        const {name, color} = this.props.label

        return {
            name,
            color
        }
    },

    onNameChange(evt) {
        this.setState({
            name: evt.target.value
        })
    },

    onColorChange(evt) {
        this.setState({
            color: event.target.value.slice(1)
        })
    },

    onSubmit(evt) {
        evt.preventDefault()
        const {label} = this.props
        label.update(this.state)
        label.editing = false
    },

    render() {
        const {label} = this.props
        const {color} = this.state
        const cssColor = `#${color}`
        let content

        if (label.editing) {
            content = (
            <form onSubmit={this.onSubmit} className='label'>
                <span style={{backgroundColor: cssColor}} className='label-color avatar avatar-small avatar-rounded'>&nbsp;</span>
                <input name='name' value={this.state.name} onChange={this.onNameChange} />
                <input name='color' value={cssColor} onChange={this.onColorChange} />
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

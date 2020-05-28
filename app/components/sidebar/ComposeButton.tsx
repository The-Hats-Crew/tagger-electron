import React from 'react';
import {connect} from 'react-redux';
import {setSliding} from '../../actions';

export const ComposeButton = props => {

    const toggleIsComposing = () => {
        props.setComposer(true);
        props.setSliding(false);
    }

    return (
        <input type="button" className="compose btn" onClick={toggleIsComposing} value="Compose" />
    )
}

export default connect(null, {setSliding})(ComposeButton);

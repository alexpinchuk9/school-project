import React, {Component} from 'react';
import PropTypes from 'prop-types';

class HeaderComponent extends Component {
    render() {

        const { onRefresh } = this.props;

        return (
            <div className="header">
                <button className="refresh-button" onClick={onRefresh}>
                    Refresh
                </button>
            </div>
        );
    }
}

HeaderComponent.propTypes = {
    onRefresh: PropTypes.func.isRequired
};

export default HeaderComponent;

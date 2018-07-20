import React, {Component} from 'react';
import PropTypes from 'prop-types';

class HeaderComponent extends Component {

    renderShortcuts = () => {

        const { shortcutItems,selectItem } = this.props;

        return shortcutItems.map(item => <button
                                            key={item.id}
                                            className="shortcut-button"
                                            onClick={() => selectItem(item)}>{item.groupName}</button>);
    }
    render() {

        const { onRefresh, onGoBack, previousItem } = this.props;

        const goBackButton = previousItem ?
            <button className="go-back-button" onClick={onGoBack}>Go back</button> :
            <button className="go-back-button disabled">Go back</button>;

        return (
            <div className="header">

                <div>
                    <button className="refresh-button" onClick={onRefresh}>
                        Refresh
                    </button>
                    {goBackButton}
                </div>

                <div>
                    {this.renderShortcuts()}
                </div>

            </div>
        );
    }
}

HeaderComponent.propTypes = {
    onRefresh: PropTypes.func.isRequired
};

export default HeaderComponent;

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { MESSAGE, UPDATE } from "../constants/popupTypes";
import PopupComponent from '../containers/PopupContainer';

class GroupComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            popup: {
                open: false,
                type: null
            }
        };
    }


    handlePopupOpen = (type) => {
        this.setState({
            popup: {
                open: true,
                type: type
            }
        });
    }


    handlePopupClose = () => {
        this.setState({
            popup: {
                open: false,
                type: null
            }
        });
    }

    renderGroupFullRepresentation = () => {

        const { group, className } = this.props;
        const { open, type } = this.state.popup;
        const initialValues = {
            groupName: group.groupName
        };

        const messageActionButton = group.email ?
            <span className="message" onClick={() => this.handlePopupOpen(MESSAGE)}></span> :
            <span className="message disabled"></span>;

        return (
            <div className={`${className} group group-full-representation`}>
                <div className="group-image-view">
                    <img
                        src='/statics/img/group_sm_icon.png'
                        alt="Group Avatar"
                        className="group-image"
                    />
                </div>
                <div className="group-info">
                    <div className="group-name">
                        <h1 className="name">
                            {group.groupName}
                        </h1>
                    </div>
                    <div className="group-actions">
                        {messageActionButton}
                        <span className="edit" onClick={() => this.handlePopupOpen(UPDATE)}></span>
                    </div>
                </div>
                { open && <PopupComponent type={type} handleClose={this.handlePopupClose} group={group} initialValues={initialValues}/>}
            </div>
        );
    }

    renderGroupShortRepresentation = () => {

        const { group, className } = this.props;

        return (
            <div className={`${className} group group-short-representation`} onClick={this.props.onClick}>
                <div className="group-image-view">
                    <img
                        src='/statics/img/group_sm_icon.png'
                        alt="Group Avatar"
                        className="group-image"
                    />
                </div>
                <div className="group-info">
                    <div className="group-name">
                        <h1 className="name">
                            {group.groupName}
                        </h1>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { isSelected } = this.props;
        let render = isSelected ? this.renderGroupFullRepresentation() : this.renderGroupShortRepresentation();

        return render;
    }
}

GroupComponent.propTypes = {
    isSelected: PropTypes.bool,
    group: PropTypes.object
};

export default GroupComponent;

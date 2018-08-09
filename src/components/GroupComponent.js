import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { MESSAGE, UPDATE_GROUP, DELETE, ADD_GROUP, ADD_PERSON } from "../constants/popupTypes";
import PopupComponent from '../containers/PopupContainer';
import styled from "styled-components";

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

        const { group, className, user } = this.props;
        const { open, type } = this.state.popup;
        const initialValues = {
            groupName: group.groupName,
            groupId: group.id
        };


        const actions = user.isAdmin ?
            (
                <div className="actions">
                    <button
                        className="add-group"
                        title="הוספת תת-קבוצה"
                        onClick={() => this.handlePopupOpen(ADD_GROUP)}>
                    </button>
                    <button
                        className="delete-group"
                        title="מחיקה"
                        onClick={() => this.handlePopupOpen(DELETE)}>
                    </button>
                    <button
                        className="add-people"
                        title="הוספה לקבוצה"
                        onClick={() => this.handlePopupOpen(ADD_PERSON)}>
                    </button>
                </div>
            ) : null;

        const permissionsMessageButton = user.isAdmin || user.isStaff ?
            (
                <button
                    title="שלח הודעה"
                    className="message"
                    onClick={() => this.handlePopupOpen(MESSAGE)}>
                </button>
            ) : null;

        const updateButton = (
            <button
                title="עדכון פרטים"
                className="edit"
                onClick={() => this.handlePopupOpen(UPDATE_GROUP)}>
            </button>
        );

        const permissionsUpdateButton = user.isAdmin ? updateButton : null;
        return (
            <div className="wrapper">

                    <div className={`${className} group group-full-representation`}>
                        <GroupImage color={group.color}>
                            <img
                                src='/statics/img/group_sm_icon.png'
                                alt="Group Avatar"
                                className="group-image"
                            />
                        </GroupImage>
                        <div className="group-info">
                            <div className="group-name">
                                <h1 className="name">{group.groupName}</h1>
                            </div>
                            <div className="group-actions">
                                {permissionsMessageButton}
                                {permissionsUpdateButton}
                            </div>
                        </div>
                        { open && <PopupComponent
                                            existingGuardians={[]}
                                            type={type}
                                            handleClose={this.handlePopupClose}
                                            group={group}
                                            className={type === ADD_PERSON ? "add-person-popup" : ""}
                                            initialValues={initialValues}/>}
                    </div>
                {actions}
            </div>
        );
    }

    renderGroupShortRepresentation = () => {

        const { group, className } = this.props;
        return (
            <div className={`${className} group group-short-representation`} onClick={this.props.onClick}>
                <GroupImage color={group.color}>
                    <img
                        src='/statics/img/group_sm_icon.png'
                        alt="Group Avatar"
                        className="group-image"
                    />
                </GroupImage>
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

const GroupImage = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    background: ${props => props.color}
    border-radius: 12px;
    min-width: 80px;
    height: 80px;
    &:after {
      content: "";
      position: absolute;
      left: 0;
      border-top: 7px solid transparent;
      border-bottom: 7px solid transparent;
      border-right: 7px solid ${props => props.color};
      transform: translate(-100%, 0);
    }
  }
`

GroupComponent.propTypes = {
    isSelected: PropTypes.bool,
    group: PropTypes.object
};

export default GroupComponent;

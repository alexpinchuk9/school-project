import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {MESSAGE, UPDATE, DELETE, ADD_GROUP, ADD_PERSON } from "../constants/popupTypes";
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

        const { group, className } = this.props;
        const { open, type } = this.state.popup;
        const initialValues = {
            groupName: group.groupName
        };


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
                                <h1 className="name">
                                    {group.groupName}
                                </h1>
                            </div>
                            <div className="group-actions">
                                <span className="message" onClick={() => this.handlePopupOpen(MESSAGE)}></span>
                                <span className="edit" onClick={() => this.handlePopupOpen(UPDATE)}></span>
                            </div>
                        </div>
                        { open && <PopupComponent type={type} handleClose={this.handlePopupClose} group={group} initialValues={initialValues}/>}
                    </div>
                <div className="actions">
                    <span className="add-group"  onClick={() => this.handlePopupOpen(ADD_GROUP)}></span>
                    <span className="relate-people-group"></span>
                    <span className="delete-group" onClick={() => this.handlePopupOpen(DELETE)}></span>
                    <span className="add-people" onClick={() => this.handlePopupOpen(ADD_PERSON)}></span>
                </div>
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

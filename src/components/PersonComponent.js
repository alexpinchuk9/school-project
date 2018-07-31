import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {MESSAGE, PHONE, UPDATE_PERSON, DELETE, ADD_PERSON_TO_GROUP, ADD_PERSON} from "../constants/popupTypes";
import { filePath } from "../constants/api";
import styled from 'styled-components';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { filterGuardians } from "../utils/filters"

import PopupComponent from "../containers/PopupContainer";
import checkMobile from "../utils/checkmobile";

class PersonComponent extends Component {

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

    renderPersonFullRepresentation = () => {

        const {guardians, person, className} = this.props;
        const {open, type} = this.state.popup;

        const initialValues = {
            name: person.name,
            surname: person.surname,
            email: person.email,
            cellphone: person.cellphone,
            picture: person.picSource
        };

        // for (let i = 0; i < guardians.length, i++) initialValues[{`guardian`}]

        const mailActionButton = person.email ?
                                        <button title="שלח מייל" className="mail">
                                            <a href={`mailto:${person.email}`} className="mail-link"></a>
                                        </button> :
                                        <button
                                            title="כתובת המייל חסרה"
                                            className="mail disabled">
                                        </button>;

        const messageActionButton = (person.email || person.cellphone) ?
                                        <button
                                            title="שלח הודעה"
                                            className="message"
                                            onClick={() => this.handlePopupOpen(MESSAGE)}>
                                        </button> :
                                        <button
                                            title="חסרים פרטי התקשרות"
                                            className="message disabled">
                                        </button>;

        const desktopCallButton = person.cellphone ?
                                        <button
                                            title="טלפן"
                                            className="call"
                                            onClick={() => this.handlePopupOpen(PHONE)}>
                                        </button> :
                                        <button
                                            title="מספר הטלפון חסר"
                                            className="call disabled">
                                        </button>;

        const mobileCallButton = person.cellphone ?
                                    <a
                                    title="Call this number"
                                    className="call"
                                    href={`tel:${person.cellphone}`}></a> :
                                    <button
                                    title="מספר הטלפון חסר"
                                    className="call disabled"></button>;

        const currentDeviceIsMobile = checkMobile();

        const callActionButton = currentDeviceIsMobile ? mobileCallButton : desktopCallButton;

        const image = person.picSource ?
                                        <img src={`${filePath}${person.picSource}`}
                                        alt="User Avatar"
                                        className="person-image"
                                        /> :
                                            <img
                                            src='/statics/img/single_user.png'
                                            alt="User Avatar"
                                            className="person-image"
                                        />;

        return (
            <div className="wrapper">
                <div className={`${className} person person-full-representation`}>

                    <PersonImage color={person.color}>
                        {image}
                    </PersonImage>

                    <div className="person-info">

                        <div className="person-name">
                            <h1 className="name">
                                {person.name}
                            </h1>
                            <h3 className="surname">
                                {person.surname}
                            </h3>
                        </div>

                        <div className="person-actions">
                            {mailActionButton}
                            {messageActionButton}
                            {callActionButton}
                            <button
                                title="עדכון פרטים"
                                className="edit"
                                onClick={() => this.handlePopupOpen(UPDATE_PERSON)}>
                            </button>
                        </div>

                    </div>

                    {open && <PopupComponent type={type}
                                             handleClose={this.handlePopupClose}
                                             person={person}
                                             className={type === UPDATE_PERSON ? "update-person-popup" : ""}
                                             existingGuardians={guardians}
                                             initialValues={initialValues}/>}
                </div>

                <div className="actions">

                    <button className="relate-people-group"
                            title="הוספה לקבוצה"
                            onClick={() => this.handlePopupOpen(ADD_PERSON_TO_GROUP)}>
                        <FontAwesomeIcon size="lg" icon={faLink}/>
                    </button>

                    <button
                        title="מחיקה"
                        className="delete-people"
                        onClick={() => this.handlePopupOpen(DELETE)}>
                    </button>

                </div>
            </div>
        );

    }

    renderPersonShortRepresentation = () => {
        const { person, className } = this.props;

        const image = person.picSource ?
            <img src={`${filePath}${person.picSource}`}
                 alt="User Avatar"
                 className="person-image"
            /> :
            <img
                src='/statics/img/single_user.png'
                alt="User Avatar"
                className="person-image"
            />;

        return (
            <div className={`${className} person person-short-representation`} onClick={this.props.onClick}>
                <PersonImage color={person.color}>
                    {image}
                </PersonImage>
                <div className="person-info">
                    <div className="person-name">
                        <h1 className="name">
                            {person.name}
                        </h1>
                        <h3 className="surname">
                            {person.surname}
                        </h3>
                    </div>
                    <div className="person-relation">
                        {person.relation}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { isSelected } = this.props;

        let render = isSelected ? this.renderPersonFullRepresentation() : this.renderPersonShortRepresentation();

        return render;
    }
}

const PersonImage = styled.div`
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

PersonComponent.propTypes = {
    isSelected: PropTypes.bool,
    person: PropTypes.object,
};

export default PersonComponent;

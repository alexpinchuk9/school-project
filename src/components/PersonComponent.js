import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { MESSAGE, PHONE, UPDATE } from "../constants/popupTypes";
import PopupComponent from "../containers/PopupContainer";

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
        const { person, className } = this.props;
        const { open, type } = this.state.popup;
        const initialValues = {
            name: person.name,
            surname: person.surname,
            email: person.email,
            cellphone: person.cellphone,
            picture: person.picSource
        }
        return (
            <div className={`${className} person person-full-representation`}>
                <div className="person-image-view">
                    <img
                        src='/statics/img/single_user.png'
                        alt="User Avatar"
                        className="person-image"
                    />
                </div>
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
                        { person.email ?
                            <span className="mail"><a href={`mailto:${person.email}`} className="mail-link"></a></span> :
                            <span className="mail disabled"></span>
                        }
                        {
                            person.email ?
                                <span className="message" onClick={() => this.handlePopupOpen(MESSAGE)}></span> :
                                <span className="message disabled"></span>
                        }
                        {
                            person.cellphone ?
                                <span className="call" onClick={() => this.handlePopupOpen(PHONE)}></span> :
                                <span className="call disabled"></span>
                        }
                        <span className="edit" onClick={() => this.handlePopupOpen(UPDATE)}></span>
                    </div>
                </div>
                { open && <PopupComponent type={type} handleClose={this.handlePopupClose} person={person} initialValues={initialValues}/>}
            </div>
        );
    }

    renderPersonShortRepresentation = () => {
        const { person, className } = this.props;
        return (
            <div className={`${className} person person-short-representation`} onClick={this.props.onClick}>
                <div className="person-image-view">
                    <img
                        src='/statics/img/single_user.png'
                        alt="User Avatar"
                        className="person-image"
                    />
                </div>
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
        const { isSelected, person, className } = this.props;
        const { open, type } = this.state.popup;

        if(isSelected) {

        }

        }
}

PersonComponent.propTypes = {
    isSelected: PropTypes.bool,
    person: PropTypes.object,
};

export default PersonComponent;

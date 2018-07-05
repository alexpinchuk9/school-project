import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { MESSAGE, UPDATE, PHONE } from "../constants/popupTypes";

class PopupComponent extends Component {

    renderForm = () => {
        const { type } = this.props;
        switch(type) {
            case MESSAGE:
                return this.renderMessageForm();
            case UPDATE:
                return this.renderUpdateForm();
            case PHONE:
                return this.renderPhoneForm();
            default:
                return null;
        }
    }

    renderMessageForm = () => {
        const { group, person, handleClose } = this.props;
        return (
          <form className="form message-form">
              <button className="button-close" onClick={handleClose}></button>
              <div className="form-row">
                  <label htmlFor="message" className="field-label">Message for {person.name || group.groupName}</label>
                  <textarea id="message" className="form-field textarea-field"></textarea>
              </div>
              <div className="form-row">
                  <button type="submit" className="button-submit">Send</button>
              </div>

          </form>
        );
    }

    renderUpdateForm = () => {
        const { group, person, handleClose } = this.props;
        if(group) {
            return (
                <form className="form update-form">
                    <button className="button-close" onClick={handleClose}></button>
                    <div className="form-row">
                        <label htmlFor="name" className="field-label">Group name:</label>
                        <input type="text" id="name" className="form-field" />
                    </div>
                    <div className="form-row">
                        <button type="submit" className="button-submit">Update</button>
                    </div>
                </form>
            );
        } else if(person) {
            return (
                    <form className="form update-form">
                        <button className="button-close" onClick={handleClose}></button>
                        <div className="form-row">
                            <label htmlFor="name" className="field-label">Name:</label>
                            <input type="text" id="name" defaultValue={person.name}  className="form-field"/>
                        </div>
                        <div className="form-row">
                            <label htmlFor="surname" className="field-label">Surname:</label>
                            <input type="text" id="surname" defaultValue={person.surname}  className="form-field"/>
                        </div>
                        <div className="form-row">
                            <label htmlFor="email" className="field-label">Email:</label>
                            <input type="email" id="email" defaultValue={person.email}  className="form-field"/>
                        </div>
                        <div className="form-row">
                            <label htmlFor="cellphone" className="field-label">Cellphone:</label>
                            <input type="phone" id="phone" defaultValue={person.cellphone}  className="form-field"/>
                        </div>
                        <div className="form-row form-image-row">
                            <label htmlFor="picture">
                                {person.picSource ?
                                    <img src={person.picSource} /> :
                                    <img src={require('../statics/img/single_user.png')} className="form-image" />}
                            </label>
                            <label htmlFor="picture" className="picture-label">Upload pic</label>
                            <input type="file" id="picture" accept="image/*" className="form-field"/>
                        </div>
                        <div className="form-row">
                            <button type="submit" className="button-submit">Update</button>
                        </div>
                    </form>
                );
        }
    }

    renderPhoneForm = () => {
        const { person, handleClose } = this.props;
        if(!person.cellphone) {
            return (
                <div className="form phone-form">
                    <div className="form-row">
                        <div className="form-text">
                            Looks like we don't have a phone number for {person.name} yet!
                        </div>
                    </div>
                    <div className="form-row">
                        <button onClick={handleClose} className="button-submit">Close</button>
                    </div>
                </div>
            );
        }
        return (
          <div className="form phone-form">
              <div className="form-row">
                  <div className="form-text">
                      {person.cellphone}
                  </div>
              </div>
              <div className="form-row">
                  <div className="form-text">
                      Copied to clipboard
                  </div>
              </div>
              <div className="form-row">
                  <button onClick={handleClose} className="button-submit">Close</button>
              </div>
          </div>
        );
    }

    render() {
        return (
            <div className={`popup`}>
                {this.renderForm()}
            </div>
        );
    }
}

PopupComponent.propTypes = {};

export default PopupComponent;

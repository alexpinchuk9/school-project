import React, {Component} from 'react';
import PropTypes from 'prop-types';

class PersonComponent extends Component {

    render() {
        const { isSelected, person, className } = this.props;
        if(isSelected) {
            return (
                <div className={`${className} person person-full-representation`}>
                    <div className="person-image-view">
                        <img 
                            src={require('../statics/img/single_user.png')} 
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
                            <span className="mail"></span>
                            <span className="message"></span>
                            <span className="call"></span>
                            <span className="edit"></span>
                        </div>
                    </div>
                </div>
            );
        }
            return (
                <div className={`${className} person person-short-representation`} onClick={this.props.onClick}>
                    <div className="person-image-view">
                        <img 
                            src={require('../statics/img/single_user.png')} 
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
}

PersonComponent.propTypes = {};

export default PersonComponent;

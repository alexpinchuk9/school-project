import React, {Component} from 'react';
import PropTypes from 'prop-types';

class GroupComponent extends Component {

    render() {
        const { isSelected, group, className } = this.props;
        console.log(group);
        if(isSelected) {
            return (
                <div className={`${className} group group-full-representation`}>
                    <div className="group-image-view">
                        <img 
                            src={require('../statics/img/group_sm_icon.png')} 
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
                            <span className="message"></span>
                            <span className="edit"></span>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className={`${className} group group-short-representation`} onClick={this.props.onClick}>
                <div className="group-image-view">
                        <img 
                            src={require('../statics/img/group_sm_icon.png')} 
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
}

GroupComponent.propTypes = {};

export default GroupComponent;

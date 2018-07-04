import {connect} from 'react-redux';
import MainPageComponent from '../components/MainPageComponent';
import { getItems, selectItem } from '../actions';

const mapStateToProps = (state) => {
    return {
        items: state.items
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getItems: () => {
            dispatch(getItems())
        },
        selectItem: (item) => {
            dispatch(selectItem(item))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPageComponent);

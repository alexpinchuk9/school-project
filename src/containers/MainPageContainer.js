import {connect} from 'react-redux';
import MainPageComponent from '../components/MainPageComponent';
import { getItems, selectItem, refreshItems } from '../actions';

const mapStateToProps = (state) => {
    return {
        items: state.items,
        popup: state.popup
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getItems: () => {
            dispatch(getItems())
        },
        selectItem: (item) => {
            dispatch(selectItem(item))
        },
        refreshItems: (selectedItem) => {
            dispatch(refreshItems(selectedItem))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPageComponent);

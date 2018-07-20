import {connect} from 'react-redux';
import MainPageComponent from '../components/MainPageComponent';
import { getItems, selectItem, refreshItems, goBack } from '../actions';

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
        },
        goBack: () => {
            dispatch(goBack())
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPageComponent);

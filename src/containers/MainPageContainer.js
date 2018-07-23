import {connect} from 'react-redux';
import MainPageComponent from '../components/MainPageComponent';
import { getItems, selectItem, refreshItems, goBack, searchItems, resetSearchResults } from '../actions';

const mapStateToProps = (state) => {
    return {
        items: state.items,
        popup: state.popup,
        search: state.search
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
        },
        searchItems: (query, items) => {
            dispatch(searchItems(query, items))
        },
        resetSearchResults: () => {
            dispatch(resetSearchResults())
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPageComponent);

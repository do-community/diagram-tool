import  { bindActionCreators } from 'redux';
import  { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Main from './Main';

function mapStateToProps(state) {
  return {
    metadata: state.metadata,
    connectors: state.connectors,
    nodes: state.nodes,
    selection: state.selection,
    mode: state.mode
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;

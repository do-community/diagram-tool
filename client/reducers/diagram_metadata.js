
function diagram_metadata(state = [], action) {
  switch(action.type) {
    case 'EDIT_DIAGRAM' :
      //return updated state
      console.log('EDIT_DIAGRAM');
    default:
      return state;
  }
}

export default diagram_metadata;

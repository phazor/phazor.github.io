import { connect } from 'react-redux'
import NEOList from '../components/NEOList/NEOList'

//Object.keys(blah).map(key => blah[key]).reduce((a,b) => a.concat(b))
const flatten = (list) => (
  Object.keys(list.near_earth_objects)
    .map(key => list.near_earth_objects[key])
    .reduce((a,b) => a.concat(b))
)

const mapStateToProps = ({ NEO }) => {
  return {
    elementCount: NEO.NEOList.elementCount,
    NEOs: flatten(NEO.NEOList),
    isFetching: NEO.isFetching, // unused, for now
    didInvalidate: NEO.didInvalidate, // unused, for now
    lastAction: NEO.lastAction
  };
};

const VisibleNEOList = connect(
  mapStateToProps
)(NEOList);

export default VisibleNEOList;

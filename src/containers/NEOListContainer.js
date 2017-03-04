import { connect } from 'react-redux'
import NEOList from '../components/NEOList/NEOList'

// Concatenate paginated NEOs into a single level
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

const NEOListContainer = connect(
  mapStateToProps
)(NEOList);

export default NEOListContainer;

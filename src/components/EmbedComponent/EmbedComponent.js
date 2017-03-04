import { Parser } from 'html-to-react';

const EmbedComponent = ({embedString}) => {
  var htmlToReactParser = new Parser();
  return (
    htmlToReactParser.parse(embedString)
  )
}

export default EmbedComponent;

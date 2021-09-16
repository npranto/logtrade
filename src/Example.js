import render from "./utils/render.js";

const Example = (props) => `
  <img src="/assets/img/add.png" />
  <h1>Example LogTrade! ${props.name}</h1>
`;
const styles = (props) => `
  h1 {
    color: ${props.color};
  }
`;

export default (props) => render(props, Example, styles);
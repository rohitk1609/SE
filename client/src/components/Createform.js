import React, { Component, createRef } from "react";
import $ from "jquery";
window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

const formData = [
  {
    type: "header",
    subtype: "h1",
    label: "Drag and drop the elements"
  },
  {
    type: "paragraph",
    label: "Create your Form"
  }
];

export default class CreatForm extends Component {
  fb = createRef();
  componentDidMount() {
    $(this.fb.current).formBuilder({ formData });
  }
  render() {
    return <div id="fb-editor" ref={this.fb} />;
  }
}
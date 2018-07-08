import React from "react";
import PropTypes from "prop-types";

const AddNoteForm = ({ handleSubmit }) => (
  <form className="new-task" onSubmit={ handleSubmit } >
    <input
      type="text"
      name="title"
      ref="title"
      className="form-control"
      placeholder="Note Title" />
    <textarea
      name="content"
      ref="content" />
    <input
      type="submit"
      value="Save"
      className="form-submit" />
  </form>
);

AddNoteForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default AddNoteForm;

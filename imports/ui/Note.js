import React from "react";
import PropTypes from "prop-types";

const Note = ({ note, noteClassName, onClickToggle, onClickDelete, showOwnerOptions, onClickPrivate  }) => {

  return (
    <li className={ noteClassName } >
      { showOwnerOptions && <button className="delete" onClick={ onClickDelete } >
        &times;
      </button>}
      { showOwnerOptions && <input
        type="checkbox"
        readOnly
        checked={ !!note.checked }
        onClick={ onClickToggle } />}
      <h3 className="note-title">{ note.title}</h3>
      <p className="note-text">{ note.content }</p>
      <p className="note-date" >
        <i><strong>{ note.username }</strong></i>
        <i>{ note.createdAt.toDateString() }</i>
      </p>
      { showOwnerOptions &&
        <button className="togglePrivate"
          onClick={ onClickPrivate } >
          { note.private? "Private" : "Public" }
        </button>
      }
    </li>
  );
};

Note.propTypes = {
  note: PropTypes.object.isRequired,
  noteClassName: PropTypes.string.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onClickToggle: PropTypes.func.isRequired,
  onClickPrivate: PropTypes.func.isRequired,
  showOwnerOptions: PropTypes.bool.isRequired,
};

export default Note;

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import { withTracker } from "meteor/react-meteor-data";

import { Notes } from "../api/notes.js";
import Note from "./Note.js";
import AccountsUIWrapper from './AccountUIWrapper.js';


class App extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      hideMuted: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleHideMuted = this.toggleHideMuted.bind(this);
  }

  toggleNote(note) {
    return (() => {
      return Meteor.call("notes.setChecked", note._id, !note.checked);
    });
  }

  deleteNote(note) {
    return (() => {
      return Meteor.call("notes.remove", note._id);
    });
  }

  toggleHideMuted() {
    this.setState((prevState) => ({ hideMuted: !prevState.hideMuted }));
  }

  togglePrivacy(note) {
    return (() => {
      return Meteor.call("notes.setPrivate", note._id, !note.private);
    });
  }

  renderNotes() {
    let notes = this.props.notes;
    if(this.state.hideMuted) {
      notes = notes.filter(note => !note.checked);
    }
    return notes.map(note => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showOwnerOptions = currentUserId == note.owner;
      const noteClassName = `${ note.checked? "checked" : "" } ${ note.private? "private" : "" }`;
      return (
        <Note
          onClickToggle={ this.toggleNote(note) }
          onClickDelete={ this.deleteNote(note) }
          noteClassName={ noteClassName }
          key={ note._id }
          note={ note }
          showOwnerOptions={ showOwnerOptions }
          onClickPrivate={ this.togglePrivacy(note) } />
      );
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const title = ReactDOM.findDOMNode(this.refs.title).value.trim();
    const content = ReactDOM.findDOMNode(this.refs.content).value.trim();

    Meteor.call("notes.insert", title, content);
    ReactDOM.findDOMNode(this.refs.title).value = '';
    ReactDOM.findDOMNode(this.refs.content).value = '';
  }

  render() {
    return (
      <div className="container">
        <header>
          <AccountsUIWrapper />
          <h1>Notes</h1>
          <p>Muted Notes: { this.props.mutedNotesCount } {'\u00A0'} Active Notes: { this.props.notes.length - this.props.mutedNotesCount }</p>
          <div className="filters">
            <label className="hide-complete">
              <input type="checkbox"
                readOnly
                checked={ this.state.hideMuted }
                onClick={ this.toggleHideMuted }
                />
              Hide Muted Notes
            </label>
          </div>
          { this.props.currentUser &&
            <form className="new-task" onSubmit={ this.handleSubmit } >
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
          }
        </header>
        <ul>
          { this.renderNotes() }
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  notes: PropTypes.array,
  mutedNotesCount: PropTypes.number,
  currentUser: PropTypes.object,
};

export default withTracker(() => {
  Meteor.subscribe("notes");

  return {
    notes: Notes.find({}, { sort: { createdAt: -1 } }).fetch(),
    mutedNotesCount: Notes.find({ checked: { $eq: true } }).count(),
    currentUser: Meteor.user(),
  };
})(App);

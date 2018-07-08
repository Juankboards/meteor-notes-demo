import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Mongo } from "meteor/mongo";

export const Notes = new Mongo.Collection("notes");

if(Meteor.isServer) {
  Meteor.publish("notes", function notesPublications() {
    return Notes.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId }
      ],
    });
  });
}

Meteor.methods ({
  "notes.insert"(title, content) {
    check(title, String);
    check(content, String);

    if(!this.userId) {
      throw new Meteor.Error("not-autharized");
    }

    Notes.insert({
      title,
      content,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  "notes.remove"(noteId) {
    check(noteId, String);

    const note = Notes.findOne(noteId);

    if(note.owner != this.userId) {
      throw new Meteor.Error("not-autharized");
    }

    Notes.remove(noteId);
  },
  "notes.setChecked"(noteId, setChecked) {
    check(noteId, String);
    check(setChecked, Boolean);

    const note = Notes.findOne(noteId);

    if(note.owner != this.userId) {
      throw new Meteor.Error("not-autharized");
    }

    Notes.update(noteId, {
      $set: { checked: setChecked },
    });
  },
  "notes.setPrivate"(noteId, setPrivate) {
    check(noteId, String);
    check(setPrivate, Boolean);

    const note = Notes.findOne(noteId);

    if(note.owner != this.userId) {
      throw new Meteor.Error("not-autharized");
    }

    Notes.update(noteId, {
      $set: { private: setPrivate },
    });
  },
});

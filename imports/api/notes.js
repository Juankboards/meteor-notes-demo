import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Mongo } from "meteor/mongo";

export const Notes = new Mongo.Collection("notes");

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

    Notes.remove(noteId);
  },
  "notes.setChecked"(noteId, setChecked) {
    check(noteId, String);
    check(setChecked, Boolean);

    Notes.update(noteId, {
      $set: { checked: setChecked },
    });
  }
});

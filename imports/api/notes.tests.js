import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'chai';

import { Notes } from "./notes.js";

export const notesApiTest = () => {
  if (Meteor.isServer) {
    describe('Notes', () => {
      describe('methods', () => {
        const userId = Random.id();
        let noteId;

        beforeEach(() => {
          Notes.remove({});
          noteId = Notes.insert({
            text: 'test note',
            createdAt: new Date(),
            owner: userId,
            username: 'tmeasday',
          });
        });

        it('can delete owned note', () => {

          const deleteTask = Meteor.server.method_handlers['notes.remove'];
          const invocation = { userId };
          deleteTask.apply(invocation, [noteId]);
          assert.equal(Notes.find().count(), 0);
        });
      });
    });
  }
};

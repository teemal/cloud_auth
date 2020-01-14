<template>
  <div class="wrapper">
    <div class="level-right">
      <Logout id="logout"/>
    </div>
    <div class="note-input">
      <label>Note:</label>
      <input type="text" v-model="key" />
      <br />
      <label>Description:</label>
      <input type="text" v-model="value" @keyup.enter="submitNote()" />
      <br />
      <div id="add-btn">
          <button v-on:click="submitNote()">Add</button>
      </div>
    </div>
    <div class="columns">
      <p class="column is-half">NOTES:</p>
      <p class="column is-half">DESCRIPTION:</p>
    </div>
    <div class="columns">
      <ul class="column is-half">
        <li class="note-card" v-for="(note, key) in notes" v-bind:key="key">
          <h3 class="" v-on:click="updateName(note)">{{note.name}}</h3>
          <button v-on:click="editNote()" id="note-edit">Edit</button>
          <button v-on:click="deleteNote(key)">Delete</button>
          <!-- <button v-if="edit" v-on:click="updateNote(key)">Update</button> -->
          <input
            type="text"
            class="name-edit"
            v-if="edit"
            v-model="edit_note[key]"
            @keyup.enter="updateNote(key)"
          />
        </li>
      </ul>
      <div class="column is-half">
        <h3 class="desc">{{desc}}</h3>
        <button v-on:click="editNote()" id="desc-edit">Edit</button>
        <!-- <button v-if="edit" v-on:click="updateNote(key)">Update</button> -->
          <input
            type="text"
            v-if="edit"
            v-model="desc"
            @keyup.enter="updateDesc(key)"
          />
      </div>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
const firebaseApp = require("../firebase/ConfigFirebase");
import Logout from "../components/Logout";
import { notesRef, db } from "../firebase/ConfigFirebase";

export default {
  components: {
    Logout
  },
  methods: {
    submitNote() {
      notesRef
        .push({ name: this.key, value: this.value, edit: false })
        .then((this.key = ""), (this.value = ""));
    },
    editNote() {
      this.edit = true;
    },
    updateNote(key) {
      this.edit = false;
      db.ref("notes/" + key).set({
        name: this.edit_note[key],
        value: this.desc
      });
    },
    deleteNote(key) {
      db.ref("notes/" + key).remove();
    },
    updateName(note) {
      this.desc = note.value;
    },
    updateDesc(key) {
    //     this.edit = false;
    //     db.ref("notes/" + key).set({
    //     name: this.edit_note[key],
    //     value: this.desc
    //   });
    }
  },
  data() {
    return {
      key: "",
      value: "",
      desc: "",
      notes: [],
      edit: false,
      edit_note: [],
      highlight: false,
      selected: 'noteSelected',
      notSelected: 'noteNotSelected',
    };
  },
  created() {
    notesRef.on("value", snapshot => {
      this.notes = snapshot.val();
    });
  }
};
var test = 0;
</script>

<style scoped>
.wrapper{
    color: white;
}
.note{
    margin-top: 20px;
}
.desc{
    margin-top: 20px;
}
.note-card {
    margin-left: 5vw;
    margin-bottom: 1vh;
    border: 2px;
    border-style: solid;
    border-color: white;
    border-radius: 2px;
    transform: rotate(0.5deg);
}
#add-btn{
    transform: rotate(-.5deg);
}

#logout{
    transform: rotate(1deg);
}

#note-edit{
    transform: rotate(-1deg);
}

#desc{
    transform: rotate(1deg);
}
</style>
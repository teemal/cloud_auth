<template>
  <div class="wrapper">
    <div class="field">
      <label class="label">Note</label>
      <div class="control">
        <input class="input" type="text" placeholder="e.g That's the bottom line" v-model="key" />
      </div>
    </div>

    <div class="field">
      <label class="label">Description</label>
      <div class="control">
        <input
          class="input"
          type="email"
          placeholder="e.g. Because Stone Cold said so."
          v-model="value"
          @keyup.enter="submitNote()"
        />
      </div>
      <button class="button is-primary is-outlined" v-on:click="submitNote()">Add Note</button>
    </div>
    <div class="columns">
      <div class="column is-2 is-offset-4">
        <div class="notification is-primary" v-if="this.fileSent">
          <button class="delete" v-on:click="delNotification"></button>
          WOO HOO! You went and
          <strong>SENT</strong>
          it bud!
        </div>
      </div>
    </div>
    <div class="columns">
      <p class="column is-half">NOTES:</p>
      <p class="column is-half">DESCRIPTION:</p>
    </div>
    <div class="columns">
      <ul class="column is-half">
        <li class="note-card" v-for="(note, key) in notes" v-bind:key="key">
          <div class="box">
            <h3 class="note-name" v-on:click="updateName(note, key)">{{note.name}}</h3>
            <button class="button is-warning is-rounded" v-on:click="editNote()" id="note-edit">Edit</button>
            <button class="button is-link is-rounded" @click="fileSelect">Add File</button>
            <button class="button is-danger is-rounded" v-on:click="deleteNote(key)">Delete</button>
            <input
              type="text"
              class="name-edit"
              v-if="edit"
              v-model="edit_note[key]"
              @keyup.enter="updateNote(key)"
            />
            <ul class="column is-half is-offset-one-quarter">
              <input type="file" @change="fileSelected" v-if="selectFile" />
              <img id="send-icon" src="@/assets/send.png" v-if="selectFile" @click="uploadFile(key)" />
            </ul>
          </div>
        </li>
      </ul>
      <div class="column is-half">
        <h3 class="desc">{{desc}}</h3>
        <img v-for="(file, key) in loadedFiles" v-bind:key="key" v-bind:src="file">
        <button class="button is-warning is-rounded" v-on:click="editNote()" id="desc-edit">Edit</button>
        <input type="text" v-if="edit" v-model="desc" @keyup.enter="updateDesc(key)" />
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
const firebaseApp = require("../firebase/ConfigFirebase");
import * as firebase from "firebase";
import { notesRef, db } from "../firebase/ConfigFirebase";
// var test_img = require('@/assets/big_chungus.png');
// import Note from '../components/Note'

export default {
  components: {
    //   Note,
  },
  methods: {
    submitNote() {
      notesRef
        .push({ name: this.key, value: this.value, edit: false })
        .then((this.key = ""), (this.value = ""));
    },
    editNote() {
      this.edit = this.edit == true ? false : true;
    },
    updateNote(key) {
      this.edit = this.edit == true ? false : true;
      db.ref("notes/" + key).set({
        name: this.edit_note[key],
        value: this.desc
      });
    },
    deleteNote(key) {
      db.ref("notes/" + key).remove();
    },
    updateName(note, key) {
      this.desc = note.value;
    
      //LOAD IMAGE UNDER DESCRIPTION
      //THIS SHOULDNT BE HERE BUT THIS CODE IS COUPLED AND NOW IT IS WHAT IT IS
      //THIS SHOULD BE MOVED TO A SANE LOCATION BUT IM OUT OF TIME
      var fireRef = firebase.storage().ref();
      fireRef.child("files/" + this.uid + "/" + key).listAll()
      .then((res) => {
        this.loadedFiles = [];
        for(const i in res.items){
            fireRef.child(res.items[i].location.path).getDownloadURL()
            .then((res) =>{
                this.loadedFiles.push(res);
            })
            .catch((err) => {
                console.log(err);
            });
        }
      });
    },
    updateDesc(key) {
      //     this.edit = false;
      //     db.ref("notes/" + key).set({
      //     name: this.edit_note[key],
      //     value: this.desc
      //   });
    },
    fileSelected(event) {
      console.log(event);
      this.file = event.target.files[0];
    },
    fileSelect() {
      this.selectFile = this.selectFile == true ? false : true;
    },
    uploadFile(key) {
      const storageRef = firebase.storage().ref();
      const filesRef = storageRef.child(
        "files/" + this.uid + "/" + key + "/" + this.file.name
      );
      filesRef
        .put(this.file)
        .then(res => {
          this.fileSent = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    delNotification() {
      this.fileSent = false;
    }
  },
  data() {
    return {
      key: "",
      value: "",
      desc: "",
      notes: [],
      edit: false,
      selectFile: false,
      edit_note: [],
      uid: "",
      highlight: false,
      selected: "noteSelected",
      notSelected: "noteNotSelected",
      file: "",
      fileUrl: "",
      fileSent: false,
      loadedFiles: [''],
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.uid = user.uid;
    });
    notesRef.on("value", snapshot => {
      this.notes = snapshot.val();
    });
  }
};
var test = 0;
</script>

<style scoped>
.note-name {
  margin-top: 20px;
}
.desc {
  margin-top: 20px;
}
.note-card {
  margin-bottom: 1vh;
  margin-left: 3vw;
}
#send-icon {
  width: 10%;
}
#send-icon:hover {
  cursor: pointer;
}
.note-name {
  font-size: 150%;
}
.note-name:hover{
    cursor: pointer;
}
.notification.is-primary {
  position: absolute;
  z-index: 1;
}
</style>
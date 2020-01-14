<template>
    <div class="wrapper">
        <div class="logout-div">
            <Logout /> 
        </div>
        <div class="note-input">
            <label>Note: </label>
            <input type="text" v-model="key"/> <br>
            <label>Description: </label>
            <input type="text" v-model="value"/> <br>
            <button v-on:click="submitNote">Add</button>
        </div>
        <p id="notes-titles">NOTES:</p>
        <p id="desc-title">DESCRIPTION:</p>
        <div>
            <ul>
                <li id="note-name" v-for="(note, key) in notes" v-bind:key="key">
                    <h3 v-on:click="updateDesc(key)">{{note.name}}</h3>
                    <button v-on:click="editNote()">Edit</button>
                    <button v-on:click="deleteNote(key)">Delete</button>
                    <button v-if="edit" v-on:click="updateNote(key)">Update</button>
                    <h3>{{note.value}}</h3>
                    <input type="text" class="name-edit" v-if="edit" v-model="edit_note[key]" @keyup.enter="updateNote(key)">
                </li>
            </ul>
        </div>
        <div>
            <!-- <p id="note-desc" v-for="note of notes" v-bind:key="note['.name']">{{note.value}}</p> -->
        </div>   
    </div>    
</template>

<script>
const firebaseApp = require("../firebase/ConfigFirebase");
import Logout from '../components/Logout';
import { notesRef, db } from '../firebase/ConfigFirebase';


export default {
    components: {
        Logout,
    },
    methods: {
        submitNote(){
            notesRef.push({name: this.key, value: this.value, edit: false})
            .then(this.key = '', this.value = '');
        },
        editNote(){
            this.edit = true
        },
        updateNote(key){
            this.edit = false
            db.ref('notes/' + key).set({
                name: this.edit_note[key]
            });
        },
        deleteNote(key){
            db.ref('notes/' + key).remove()
        },
        updateDesc(key){
            this.desc = key;
        }
    },
    data() {
        return {
            key: '',
            value: '',
            desc: '',
            notes: [],
            edit: false,
            edit_note: [],
        }
    },
    created() {
      notesRef.on('value', (snapshot) => {
          this.notes = snapshot.val();
      });
    },
}
var test = 0;
</script>

<style scoped>
.wrapper{
    display: grid;
    grid-template-rows: repeat(20, 5%);
    grid-template-columns: repeat(20,5%);
}

.logout-div{
    grid-area: 1/17/2/21;
}

.logout-btn{
    width: 10vw;
}

.note-input{
    grid-area: 2/1/7/21;
}
#notes-title{
    grid-area: 4/1/6/11;
}

#desc-title{
    grid-area: 4/12/6/21;
}

#note-name {
    grid-area: 7/1/21/11;
}

#note-desc{
    grid-area: 7/12/21/21;
}
li {
    text-decoration: none;
    list-style-type: none;
 }

</style>
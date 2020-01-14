<template>
    <div class="wrapper">
        <div class="logout-div">
            <Logout /> 
        </div>
        <div class="note-input">
            <label>Note: </label>
            <input type="text" v-model="key"/> <br>
            <label>Description: </label>
            <input type="text" v-model="value" @keyup.enter="submitNote()"/> <br>
            <button v-on:click="submitNote()">Add</button>
        </div>
        <p id="notes-titles">NOTES:</p>
        <p id="desc-title">DESCRIPTION:</p>
        <div>
            <ul>
                <li v-for="(note, key) in notes" v-bind:key="key">
                    <h3 class="note-name" v-on:click="updateDesc(note)">{{note.name}}</h3>
                    <button v-on:click="editNote()">Edit</button>
                    <button v-on:click="deleteNote(key)">Delete</button>
                    <button v-if="edit" v-on:click="updateNote(key)">Update</button>
                    <input type="text" class="name-edit" v-if="edit" v-model="edit_note[key]" @keyup.enter="updateNote(key)">
                </li>
                <div>
                    <h3 class="note-desc">{{desc}}</h3>
                </div>
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
        updateDesc(note){
            this.desc = note.value;
            console.log(this.desc);
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
    width: 100px;
}

.note-input{
    grid-area: 2/1/7/21;
}
#notes-titles{
    grid-area: 6/1/6/11;
}

#desc-title{
    grid-area: 6/12/6/21;
}

.note-name {
    grid-area: 7/1/21/11;
}

.note-desc{
    grid-area: 7/12/21/21;
}
li {
    text-decoration: none;
    list-style-type: none;
 }

 div.note-desc{
     overflow: scroll;
 }

</style>
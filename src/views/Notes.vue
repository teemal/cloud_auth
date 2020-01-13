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
            <p id="note-name" v-for="note of notes" v-bind:key="note['.name']">{{note.name}}</p>
        </div>
        <div>
            <p id="note-desc" v-for="note of notes" v-bind:key="note['.name']">{{note.value}}</p>
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
            console.log('test');
            notesRef.push({name: this.key, value: this.value, edit: false})
            .then(this.key = '', this.value = '');
        },
    },
    data() {
        return {
            key: '',
            value: '',
            notes: [],
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


</style>
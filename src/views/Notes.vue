<template>
    <div class="wrapper">
        <div>
            <label>Key: </label>
            <input type="text" v-model="key"/>
            <label>Value: </label>
            <input type="text" v-model="value"/>
            <button v-on:click="submitNote">Add</button>
        </div>
        <div>
            <ul>
                <li v-for="note of notes" v-bind:key="note['.key']">{{note}}</li>
            </ul>
        </div>
        <Logout />    
    </div>    
</template>

<script>
const firebaseApp = require("../firebase/ConfigFirebase");
import Logout from '../components/Logout';
import { notesRef } from '../firebase/ConfigFirebase';

// var note_bois = db.ref('notes');
// alert(note_bois);

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
            notes: '',
        }
    },
    firebase: {
        notes: notesRef
    },
}
var test = 0;
</script>

<style scoped>

</style>
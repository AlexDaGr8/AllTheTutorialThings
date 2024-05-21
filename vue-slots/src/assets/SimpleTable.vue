<template>
    <div>
        <h1>Simple Table</h1>
        <table>
            <thead>
                <tr>
                    <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
                </tr>
            </thead>
            <tbody>
                <slot v-for="item in items" :balls="item" :headers="headers"></slot>
            </tbody>
        </table>
        
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';

@Component({})
export default class SimpleSlot extends Vue { 
    @Prop({ required: true }) items:[];
    
    get headers() {
        return Object.keys(this.items[0]);
    }
 }
</script>

<style lang="scss">

</style>
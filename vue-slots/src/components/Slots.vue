<template>
    <div>
        <h1>Slots</h1>
        <simple-table :items="listOfItems">
            <template v-slot:default="row">
                <tr>
                    <td>{{ row.balls.name }} - {{ row.headers[0] }}</td>
                    <td>{{ row.balls.bdate | dateFormater }}</td>
                    <td class="bar"><div :style="{ width: 100 * (row.balls.hair/10) + '%' }"></div></td>
                </tr>
            </template>
        </simple-table>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import SimpleTable from '@/assets/SimpleTable.vue'

@Component({
    components: { SimpleTable }
})
export default class Slots extends Vue { 
    listOfItems:{name:string; bdate:Date; hair:number; }[] = [
        { name: 'Alex', bdate: new Date(1,1,20), hair: 10 },
        { name: 'Travis', bdate: new Date(1,1,25), hair: 3 },
        { name: 'Mom', bdate: new Date(1,1,1), hair: 7 },
        { name: 'Dad', bdate: new Date(1,1,1), hair: 1 },
    ]
 }
</script>

<style lang="scss">
table {
    width: 90vw;
    margin: auto;

    font-family: "Indie Flower";
    & th, td {
        border-bottom: solid 3px var(--purple);
    }
    & th {
        border-bottom-width: 5px;
        font-size: 30px;
    }
    & td {
        text-align: center;
        border-bottom-color: var(--black-less);
    }
}

.bar {
    & div {
        height: 1em;
        background: steelblue;
    }
}
</style>
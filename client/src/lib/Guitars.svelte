<script>
    import Guitar from "./Guitar.svelte";

    import {guitars} from "../store.js";

   

    getGuitars();
    async function getGuitars(){

        const resp = await fetch("./api/guitars");

        const data = await resp.json();

        console.log(data);

        guitars.update(prev => [...prev, ...data]);

    }




</script>




<h2>Guitars</h2>


{#each $guitars as guitar (guitar.id)}

    <Guitar {guitar} ></Guitar>

{/each}
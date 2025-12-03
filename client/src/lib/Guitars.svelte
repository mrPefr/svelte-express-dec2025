<script>
    import Guitar from "./Guitar.svelte";


    let guitars = $state([]);

    getGuitars();
    async function getGuitars(){

        const resp = await fetch("./api/guitars");

        const data = await resp.json();

        console.log(data);

        guitars = data;

    }




</script>




<h2>Guitars</h2>


{#each guitars as guitar (guitar.id)}

    <Guitar {guitar} ></Guitar>

{/each}
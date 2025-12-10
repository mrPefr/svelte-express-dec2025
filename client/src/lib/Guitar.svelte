<script>
    import {guitars} from "../store";

    export let guitar;

    let u = false;

    function delGuitar(){

        fetch("./api/guitars/"+guitar.id,{
            method:"DELETE"
        }).then(resp=>{
            if(resp.status == 200){
                guitars.update(prev=>prev.filter(g=>g.id != guitar.id));
            }
            console.log(resp);

        }).catch(err=>console.log(err)).
        finally(_=>console.log("finally..."));

        
    }


    async function updateGuitar(ev){
        ev.preventDefault();

        const response = await fetch("./api/guitars/"+guitar.id,{
            method:"PUT",
            body: JSON.stringify(guitar),
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(response.status == 200){
           return u =!u;
        }
        
        alert("SERVER ERROR, try again later....");

    }

</script>


<div id="{guitar.id}">

    <h2>{guitar.brand} - {guitar.model}</h2>
    <p><i>price: {guitar.price}</i></p>
    <button on:click={delGuitar} >DELETE</button>
    <button on:click={()=>u=!u} >EDIT</button>
    {#if u}
    <form on:submit={updateGuitar}>

        <input type="text" name="brand" bind:value={guitar.brand}>
        <input type="text" name="model" bind:value={guitar.model}>
        <input type="text" name="price" bind:value={guitar.price}>
        <input type="submit" value="update">

    </form>
    {/if}

</div>
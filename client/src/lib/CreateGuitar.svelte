<script>
    import {guitars} from "../store";
let guitar = {
    brand:"", model:"", price:""
}
async function createGuitar(ev){
    ev.preventDefault();
    
    const response = await fetch("./api/guitars",{
        method:"POST",
        body: JSON.stringify(guitar),
        headers:{
            "Content-Type":"application/json"
        }
    });
    if(response.status != 201) return alert("SERVER ERROR");

    guitar = await response.json();
    console.log(guitar);
    guitars.update(prev=>[guitar, ...prev]);

}

</script>

<div class="create">
    <h2>CREATE a new Guitar</h2>
    <form on:submit={createGuitar}>
        <input type="text" name="brand" placeholder="BRAND" bind:value={guitar.brand}>
        <i>{guitar.brand}</i>
        <input type="text" name="model" placeholder="MODEL" bind:value={guitar.model}>
                <i>{guitar.model}</i>
        <input type="text" name="price" placeholder="PRICE" bind:value={guitar.price}>
                <i>{guitar.price}</i>
        <input type="submit" value="CREATE">
    </form>


</div>

<style>

    input{
        display:block;
        max-width:70%;
    }


</style>
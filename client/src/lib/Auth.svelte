<script>

    let email = "";
    let code;

    async function login(ev){

        ev.preventDefault()
       

        const response = await fetch("./auth/login",{
            method:"POST",
            body: JSON.stringify({email}),
            headers:{"Content-Type":"application/json"}
        });

        const data = await response.text();
        console.log(data);

    }

    async function verify(ev){

        ev.preventDefault()
       

        const response = await fetch("./auth/verify",{
            method:"POST",
            body: JSON.stringify({code}),
            headers:{"Content-Type":"application/json"}
        });

        const data = await response.text();
        console.log(data);

    }


</script>

<div class="auth">

    <form on:submit={login} action="./auth/login" method="post">
        <input type="email" name="email" placeholder="EMAIL" required bind:value={email}>
        <input type="submit" value="LOGIN">
    </form>


    <p><i>{email}</i></p>


    <form on:submit={verify} action="./auth/verify" method="post">
        <input type="text" name="code" placeholder="CODE" bind:value={code}>
        <input type="submit" value="VERIFY">
    </form>

</div>
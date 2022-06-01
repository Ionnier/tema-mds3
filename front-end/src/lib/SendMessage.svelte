<script>

    import { token } from './stores.js';
    let tokenValue
    token.subscribe((val) => {
        tokenValue = val
    })

    async function sendData(data){
        const body = {
            // @ts-ignore
            content: data,
        }
         
        const result = await fetch(`${import.meta.env.VITE_MESSAGE_SERVICE}/message`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${tokenValue}`,
                "Content-Type": "application/json",
                // @ts-ignore
                "Content-Length": JSON.stringify(body).length
            },
            body: JSON.stringify(body)
        })
        const asd = await result.json()
        return true
    }

    async function onSubmit(e) {
        const formData = new FormData(e.target);
        const data = {};
            for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }
        try{
            await sendData(data.message);
            location.reload()
            return true;
        } catch(e) {
            console.log(e)
            return false;
        }
    }
</script>
<form on:submit|preventDefault={onSubmit}>
    <input type="text" name="message"/>
</form>
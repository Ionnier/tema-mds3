<script>
    export let content
    export let username = 'Guest'
    export let hasVoiceOver
    let TTS_SERVICE = import.meta.env.VITE_TTS_SERVICE
</script>
<div class="message">
    <p>{`${username || "Guest"}`}: {content}</p>
    {#if hasVoiceOver == true}
        <audio controls>
            <source src="{TTS_SERVICE}/tts/{content}" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio> 
    {/if}
</div>

  
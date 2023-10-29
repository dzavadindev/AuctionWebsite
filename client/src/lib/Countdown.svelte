<script>
    import {onMount, onDestroy} from 'svelte';
    import {differenceInSeconds, addMinutes} from 'date-fns';

    export let targetDate = addMinutes(new Date(), 5); // Default to 5 minutes from now
    let timeRemaining = calculateTimeRemaining(targetDate);
    let interval;

    onMount(() => {
        interval = setInterval(() => {
            timeRemaining = calculateTimeRemaining(targetDate);
            if (timeRemaining.total <= 0) {
                clearInterval(interval);
            }
        }, 1000);
    });

    onDestroy(() => {
        clearInterval(interval);
    });

    function calculateTimeRemaining(endtime) {
        const total = differenceInSeconds(endtime, new Date()) * 1000;
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));

        return {
            total,
            days,
            hours,
            minutes,
            seconds,
        };
    }
</script>

<span>{timeRemaining.days}:{timeRemaining.hours}:{timeRemaining.minutes}:{timeRemaining.seconds}</span>

<style>
</style>

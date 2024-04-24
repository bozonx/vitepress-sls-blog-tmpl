<script setup>
const props = defineProps(['class', 'href', 'target'])

</script>

<template>
<a :class="['simple-link', props.class]" :href="props.href" :target="target"><slot /></a>
</template>


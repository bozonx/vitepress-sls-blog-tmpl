<script setup>
import { mdToHtml } from "../../helpers/convertMd.js";

const props = defineProps(["src", "descr", "alt"]);
const descrHtml =
  props.descr &&
  mdToHtml(props.descr)
    .replace(/^\<p\>/, "")
    .replace(/\<\/p\>$/, "");
</script>

<template>
  <figure v-if="props.src">
    <img :src="props.src" :alt="props.alt" />
    <figcaption v-if="descrHtml" v-html="descrHtml" class="vp-doc"></figcaption>
  </figure>
</template>

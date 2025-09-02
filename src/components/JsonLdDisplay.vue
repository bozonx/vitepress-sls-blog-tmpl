<template>
  <div v-if="jsonLdData" class="json-ld-display">
    <details class="json-ld-details">
      <summary class="json-ld-summary">
        <span class="json-ld-icon">🔍</span>
        JSON-LD Data
      </summary>
      <div class="json-ld-content">
        <pre class="json-ld-code">{{ formattedJsonLd }}</pre>
        <div class="json-ld-actions">
          <button
            @click="copyToClipboard"
            class="copy-button"
            :title="copyButtonText"
          >
            {{ copyButtonText }}
          </button>
          <a
            :href="googleTestUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="test-button"
          >
            Test with Google
          </a>
        </div>
      </div>
    </details>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

// Props
const props = defineProps({ jsonLdData: { type: Object, default: null } })

// Reactive state
const copyButtonText = ref('Copy JSON-LD')

// Computed properties
const formattedJsonLd = computed(() => {
  if (!props.jsonLdData) return ''
  return JSON.stringify(props.jsonLdData, null, 2)
})

const googleTestUrl = computed(() => {
  if (!props.jsonLdData) return '#'
  const jsonString = encodeURIComponent(JSON.stringify(props.jsonLdData))
  return `https://search.google.com/test/rich-results?url=${encodeURIComponent(window.location.href)}&user_agent=curl&hl=en`
})

// Methods
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(formattedJsonLd.value)
    copyButtonText.value = 'Copied!'
    setTimeout(() => {
      copyButtonText.value = 'Copy JSON-LD'
    }, 2000)
  } catch (err) {
    console.error('Failed to copy: ', err)
    copyButtonText.value = 'Failed'
    setTimeout(() => {
      copyButtonText.value = 'Copy JSON-LD'
    }, 2000)
  }
}
</script>

<style scoped>
.json-ld-display {
  margin: 2rem 0;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: #f9fafb;
}

.json-ld-details {
  width: 100%;
}

.json-ld-summary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  font-weight: 600;
  color: #374151;
  background-color: #f3f4f6;
  border-radius: 0.5rem 0.5rem 0 0;
  transition: background-color 0.2s;
}

.json-ld-summary:hover {
  background-color: #e5e7eb;
}

.json-ld-icon {
  font-size: 1.25rem;
}

.json-ld-content {
  padding: 1rem;
}

.json-ld-code {
  background-color: #1f2937;
  color: #f9fafb;
  padding: 1rem;
  border-radius: 0.375rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.json-ld-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.copy-button,
.test-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
}

.copy-button {
  background-color: #3b82f6;
  color: white;
  border: none;
}

.copy-button:hover {
  background-color: #2563eb;
}

.test-button {
  background-color: #10b981;
  color: white;
  border: 1px solid #10b981;
}

.test-button:hover {
  background-color: #059669;
  border-color: #059669;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .json-ld-display {
    border-color: #4b5563;
    background-color: #1f2937;
  }

  .json-ld-summary {
    background-color: #374151;
    color: #f9fafb;
  }

  .json-ld-summary:hover {
    background-color: #4b5563;
  }

  .json-ld-code {
    background-color: #111827;
    color: #f9fafb;
  }
}
</style>

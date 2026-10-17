---
title: 'WebLLM as a local, privacy first option'
description: 'Some practical ideas on how to optimise the use of WebLLM'
pubDate: 2026-10-17
tags: ['LLM', 'MLC', 'AI', 'knowledgebase', 'JSON']
---

## Running LLMs Entirely in the Browser

WebLLM is an in-browser inference engine that runs quantized large language models locally using **WebGPU** for acceleration and **WebAssembly** for parts of the runtime. The main appeal is privacy and offline capability. Therefore, prompts, model weights, and generated text do not need to leave the user’s device.

## How it works

WebLLM loads an MLC-compiled model into the browser, allocates GPU buffers through WebGPU, and performs token-by-token inference locally. It exposes an OpenAI-like chat-completions API, so a typical integration feels familiar to developers who have used server-side LLM SDKs.

```ts
import { CreateMLCEngine } from "@mlc-ai/web-llm";
    import Fuse from "fuse.js";

    type Message = {
        role: "system" | "user" | "assistant";
        content: string;
    };

    type KnowledgeNode = {
        id: string;
        label: string;
        phrases: string[];
        synonyms: string[];
        keywords: string[];
        answer: string;
    };

    type TopicFile = {
        topic: string;
        nodes: KnowledgeNode[];
    };

    type SearchRecord = KnowledgeNode & {
        searchText: string;
    };

    let currentModelId = "Llama-3.2-1B-Instruct-q4f16_1-MLC";
    const modelSelectElement = document.getElementById(
        "model-select",
    ) as HTMLSelectElement;
    const TOPICS = ["weather", "clothing", "food", "navigation", "routes"];
    const FALLBACK =
        "I don't have a specific answer for that. Try asking about weather, clothing, food and water, navigation, or routes.";

    const systemPrompts = {
        guide: "You are an experienced mountain guide (Astro Mountain Bot). Help hikers with balanced, practical, and friendly advice about trekking, trails, and gear. Answer strictly in English.",
        rescue: "You are a dispatcher from the Mountain Rescue Service. Your responses must be highly serious, strict, and focused entirely on safety, winter markers, avalanche hazards, and survival. Do not encourage risks. Answer strictly in English.",
        nature: "You are an ecologist and biologist in a national park. Inform and inspire users about flora, fauna, biodiversity, environmental protection, and leave-no-trace camping rules. Answer strictly in English.",
    };
```

Before enabling local inference, detect support explicitly:

```ts
const support = await webllm.hasModelInCache("Llama-3.2-1B-Instruct-q4f16_1-MLC");
const canUseWebGPU = !!navigator.gpu;
```

WebGPU is available only in secure contexts, so `navigator.gpu` is available on HTTPS and localhost, but not on plain HTTP origins.

## Model choices

WebLLM supports several model families, including Llama, Phi, Gemma, Mistral, Qwen, and DeepSeek-derived models; the exact available list changes with the library version.


| Model family | Typical use | Strengths | Trade-offs |
| :-- | :-- | :-- | :-- |
| **Llama 3.2** | General chat, coding help, reasoning | Strong general-purpose quality; 1B and 3B variants fit browsers better | Larger variants may exceed mobile GPU memory |
| **Qwen3** | Multilingual chat, compact assistants | Good small-model options; useful for Chinese and English tasks | Quality varies by size and quantization |
| **Phi-4-mini** | Lightweight reasoning, instruction following | Efficient small models; often good quality per parameter | Less broad world knowledge than larger models |
| **Gemma 3** | General assistant tasks | Compact and capable; Google ecosystem alignment | Smaller context and capability limits |
| **Mistral** | Fast chat and lightweight generation | Efficient inference; practical for local tools | May need careful prompting for structured tasks |
| **DeepSeek-R1** | Reasoning-style responses | Can produce more deliberate reasoning traces | Slower and more verbose; not ideal for low-end phones |

For a browser app, a practical default is a **1.5B–3B instruct model with 4-bit quantization**. WebLLM’s own guidance maps roughly 1.5B models to devices with under 2 GB VRAM, 3B models to around 2 GB, and 8B models to 4 GB or more.

## Browser and mobile support

WebGPU support is the decisive requirement. Chromium browsers currently provide the most dependable experience, while Safari and Firefox support varies by platform and version.


| Platform | Browser | WebGPU status | WebLLM practicality |
| :-- | :-- | :-- | :-- |
| Windows | Chrome / Edge 113+ | Stable | Excellent; primary development target |
| macOS | Chrome / Edge 113+ | Stable | Excellent |
| Linux | Chrome / Edge 113+ | Historically flag-dependent; newer Chrome adds broader support | Good, but verify GPU/driver support |
| Windows | Firefox 141+ | Supported | Usable, but test carefully |
| macOS | Firefox | Later/partial rollout depending on version | Experimental; not ideal for production |
| macOS | Safari 18+ | Supported according to WebLLM docs | Usable, but expect implementation differences |
| iOS | Safari 18+ | Supported according to WebLLM docs | Possible on recent devices; memory-constrained |
| Android | Chrome 121+ | Supported | Works on capable phones; prefer 1B–3B models |
| Android | Firefox | Less consistent | Avoid as the primary target |
| Any platform | Browsers without WebGPU | Not supported for local inference | Use a server-backed fallback |

Chrome and Edge have shipped WebGPU since version 113 on Windows, macOS, and ChromeOS; Android Chrome has supported it since version 121. Firefox support arrived later and remains more platform-dependent, while Safari’s support is newer and can behave differently from Chromium in some GPU operations.

## Pros

- **Privacy by default:** user prompts and documents can remain on-device.
- **Offline or low-server operation:** after the model is cached, inference can work without repeated network calls.
- **No per-request API cost:** compute is supplied by the user’s GPU rather than a hosted inference service.
- **Lower latency after loading:** there is no network round trip for each completion.
- **Structured output:** WebLLM supports both general JSON mode and schema-constrained JSON generation.
- **Custom models:** projects can compile and deploy their own models in MLC format.


## Cons

- **Hardware inequality:** older laptops, integrated GPUs, and low-end phones may fail or run very slowly.
- **Large initial downloads:** model weights must be downloaded and cached before first use.
- **Limited model size:** browser memory and GPU limits make large frontier models impractical.
- **Browser fragmentation:** WebGPU behavior and availability differ across Chrome, Safari, Firefox, and mobile browsers.
- **Weaker quality than cloud models:** small quantized models are useful, but not equivalent to large hosted models.
- **Security still matters:** local inference does not remove the need for input validation, safe storage, and careful handling of retrieved documents.


## Extending WebLLM with JSON knowledge rules

The most practical extension is to combine the local model with a **small, explicit knowledge layer**: JSON rules, facts, glossaries, routing rules, and retrieval snippets. This keeps the model compact while making answers more predictable.

A simple rule fragment JSON look like this:

```json
{
  "topic": "clothing",
  "nodes": [
    {
      "id": "mountain-clothing",
      "label": "Mountain clothing",
      "phrases": [
        "mountain clothing",
        "alpine clothing",
        "high-altitude clothing",
        "hiking clothing",
        "outdoor clothing"
      ],
      "synonyms": [
        "habiliment",
        "apparel",
        "garments",
        "outdoor gear",
        "technical clothing"
      ],
      "keywords": [
        "gloves",
        "jacket",
        "underwear",
        "underclothing",
        "trousers",
        "pants",
        "layers",
        "waterproof",
        "windproof",
        "insulation"
      ],
      "answer": "Always use appropriate clothing in layers. Choose moisture-wicking base layers, insulating mid layers, and a wind- and water-resistant shell so you can adjust to changing temperature, wind, rain, and exertion."
    }
  ]
}
```

At runtime, match the user’s question against keywords or embeddings, inject only the relevant facts into the system prompt, and ask for schema-valid output:

```ts
const schema = {
  type: "object",
  properties: {
    answer: { type: "string" },
    sources: {
      type: "array",
      items: { type: "string" }
    },
    confidence: {
      type: "string",
      enum: ["high", "medium", "low"]
    }
  },
  required: ["answer", "sources", "confidence"]
};

const response = await engine.chat.completions.create({
  messages: [
    {
      role: "system",
      content: `Use only these project facts:\n${relevantFacts}`
    },
    { role: "user", content: question }
  ],
  response_format: {
    type: "json_object",
    schema
  }
});
```

WebLLM explicitly supports JSON-schema-constrained generation, which makes this pattern more reliable than asking a small model to “please return JSON.”

## A flexible architecture

A robust WebLLM application can be organized in four layers:

1. **Capability layer:** detect WebGPU, estimate device grade, and choose a model tier.
2. **Model layer:** load a compact local model, with an optional cloud fallback.
3. **Knowledge layer:** store JSON facts, FAQs, project rules, and retrieval indexes in IndexedDB or static JSON files.
4. **Interface layer:** render streaming responses, citations, source links, and clear “I don’t know” states.

This design turns WebLLM from a novelty into a useful local assistant: the LLM handles natural-language understanding and synthesis, while JSON rules supply authoritative project knowledge and guardrails. The result is private, extensible, and much easier to audit than relying on a model alone.

## Conclusion

WebLLM is best understood as a **local, privacy-first LLM runtime**, not a replacement for large cloud models. It shines for compact assistants, documentation chatbots, offline tools, and privacy-sensitive workflows—especially when paired with small models such as Qwen, Phi, Gemma, or Llama variants. Its main limitations are hardware dependence, browser fragmentation, and the quality ceiling of small quantized models.

The strongest architecture is hybrid: let WebLLM run locally when WebGPU is available, use JSON knowledge rules for domain accuracy, validate outputs with schemas, and fall back to a server model only when the device cannot handle local inference. That preserves privacy and offline capability without sacrificing reliability.

## Postscript
In the next post, I will show how to precisely evaluate the GPU in order to automatically select a relevant model corresponding to the hardware capabilities.

### References:
Machine Learning Compilation [MLC](https://blog.mlc.ai/2024/06/13/webllm-a-high-performance-in-browser-llm-inference-engine/)<br />
WEB Large Language Models [WebLLM](https://webllm.io/docs/concepts/architecture/)<br />
Best AI Models for WebLLM [Sourceforge](https://sourceforge.net/software/ai-models/integrates-with-webllm/)<br />
Appwrite [Blog](https://webllm.io/docs/concepts/architecture/)<br />
Pinggy [Blog](https://pinggy.io/blog/run_llm_in_browser_webgpu/)<br />

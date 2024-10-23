<template>
  <div class="prose max-w-none">
    <p class="mb-4">
      We evaluated the models:
      <a
        href="https://huggingface.co/facebook/xglm-564M"
        class="link"
        target="_blank"
        rel="noopener"
        >XGLM-564M</a
      >, a multilingual autoregressive language model (with 564 million parameters) trained on a
      balanced corpus of a diverse set of 30 languages totaling 500 billion sub-tokens, and
      <a
        href="https://huggingface.co/openai-community/gpt2"
        class="link"
        target="_blank"
        rel="noopener"
        >GPT-2</a
      >, a transformers model pretrained on a very large corpus of English data in a self-supervised
      fashion. As evaluation dataset, we used the famous
      <strong
        ><a
          href="https://huggingface.co/datasets/facebook/flores"
          class="link"
          target="_blank"
          rel="noopener"
          >FLORES-200</a
        ></strong
      >
      dataset, available on
      <a href="https://huggingface.co/" class="link" target="_blank" rel="noopener">HuggingFace</a>,
      specifically on six languages:
      <strong>English, Spanish, German, Arabic, Tamil, and Quechua</strong>.
    </p>

    <p class="mb-4">
      We analyzed the multilingual embeddings (both sentence-level and token-level) from both
      pre-trained language models using dimensionality reduction techniques: PCA with
      <a
        href="https://scikit-learn.org/dev/modules/generated/sklearn.decomposition.PCA.html"
        class="link"
        target="_blank"
        rel="noopener"
        >scikit-learn</a
      >
      and t-SNE with
      <a
        href="https://opentsne.readthedocs.io/en/stable/"
        class="link"
        target="_blank"
        rel="noopener"
        >openTSNE</a
      >.
    </p>

    <p class="mb-4">
      Finally, we finetuned the
      <a
        href="https://huggingface.co/facebook/xglm-564M"
        class="link"
        target="_blank"
        rel="noopener"
        >XGLM-564M</a
      >
      model on a specific language:
      <a
        href="https://en.wikipedia.org/wiki/Quechuan_languages"
        class="link"
        target="_blank"
        rel="noopener"
        >Quechua</a
      >
      with a dataset the model hadn't seen before,
      <strong
        ><a
          href="https://huggingface.co/datasets/Llamacha/monolingual-quechua-iic"
          class="link"
          target="_blank"
          rel="noopener"
          >Monolingual-Quechua-IIC</a
        ></strong
      >, a monolingual corpus of Southern Quechua, consisting of nearly <code>450K</code> segments
      <a
        href="https://aclanthology.org/2022.deeplo-1.1.pdf"
        class="link"
        target="_blank"
        rel="noopener"
        >[Zevallos et al., 2022]</a
      >. We used different fine-tuning methods: full fine-tuning, BitFit
      <a href="https://arxiv.org/abs/2106.10199" class="link" target="_blank" rel="noopener"
        >[Zaken et al., 2022]</a
      >, LoRA
      <a href="https://arxiv.org/abs/2106.09685" class="link" target="_blank" rel="noopener"
        >[Hu et al., 2021]</a
      >, and IA³
      <a href="https://arxiv.org/abs/2205.05638" class="link" target="_blank" rel="noopener"
        >[Liu et al., 2022]</a
      >
      and analyzed their performance and evaluation loss on the six languages mentioned above to see
      how much the performance on the <strong>Quechua</strong> language improved, and whether it
      decreased for the rest.
    </p>

    <!-- Experiments and Analyses -->
    <h2 class="text-xl font-semibold mb-4">Experiments and Analyses</h2>
    <p class="mb-4">
      We first compared the performance of the
      <a
        href="https://huggingface.co/facebook/xglm-564M"
        class="link"
        target="_blank"
        rel="noopener"
        >XGLM-564M</a
      >
      model with
      <a
        href="https://huggingface.co/openai-community/gpt2"
        class="link"
        target="_blank"
        rel="noopener"
        >GPT-2</a
      >, in terms of <em>Mean Language Modeling Loss</em>.
    </p>

    <!-- Figure 1 -->
    <figure class="mb-4">
      <img
        src="/images/multilingual-lm-representations/xglm_vs_gpt2_mean_losses-2.svg"
        alt="Loss of XGLM-564M compared to GPT-2"
        class="w-full h-auto object-contain"
      />
      <figcaption class="mt-2 text-base">
        <strong>Figure 1:</strong> Loss of the
        <a
          href="https://huggingface.co/facebook/xglm-564M"
          class="link"
          target="_blank"
          rel="noopener"
          >XGLM-564M</a
        >
        model compared to GPT-2, on the original languages. Both struggle with
        <code>quy_Latn</code> (Quechua).
      </figcaption>
    </figure>

    <p class="mb-6">
      Afterwards, we visualized the hidden representations of both the
      <a
        href="https://huggingface.co/facebook/xglm-564M"
        class="link"
        target="_blank"
        rel="noopener"
        >XGLM-564M</a
      >
      model using PCA and t-SNE for both sentence-level and token-level embeddings across all layers
      of the model. Below are visualizations from our experiments, which clearly show the
      progression of how the model learns to better separate the languages as we move to deeper
      layers:
    </p>

    <!-- First set of visualizations -->
    <figure class="mb-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <img
            src="/images/multilingual-lm-representations/sentence_xglm-564M_layer_0_t-SNE.svg"
            alt="t-SNE Visualization of Sentences in Layer 24"
            class="w-full h-auto object-contain"
          />
          <figcaption class="mt-2">
            <strong>Figure 2:</strong> t-SNE Visualization of Sentences for Layer 0.
          </figcaption>
        </div>
        <div>
          <img
            src="/images/multilingual-lm-representations/sentence_xglm-564M_layer_24_t-SNE.svg"
            alt="PCA Visualization of Sentences in Layer 24"
            class="w-full h-auto object-contain"
          />
          <figcaption class="mt-2">
            <strong>Figure 3:</strong> t-SNE Visualization of Sentences for Layer 24.
          </figcaption>
        </div>
      </div>
    </figure>

    <figure class="mb-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <img
            src="/images/multilingual-lm-representations/token_xglm-564M_layer_0_t-SNE.svg"
            alt="t-SNE Visualization of Tokens in Layer 24"
            class="w-full h-auto object-contain"
          />
          <figcaption class="mt-2">
            <strong>Figure 4:</strong> t-SNE Visualization of Tokens for Layer 0.
          </figcaption>
        </div>
        <div>
          <img
            src="/images/multilingual-lm-representations/token_xglm-564M_layer_24_t-SNE.svg"
            alt="PCA Visualization of Tokens in Layer 24"
            class="w-full h-auto object-contain"
          />
          <figcaption class="mt-2">
            <strong>Figure 5:</strong> t-SNE Visualization of Tokens for Layer 24.
          </figcaption>
        </div>
      </div>
    </figure>

    <p class="mb-4">
      Finally, the results for the finetuning of the
      <a
        href="https://huggingface.co/facebook/xglm-564M"
        class="link"
        target="_blank"
        rel="noopener"
        >XGLM-564M</a
      >
      model on the
      <strong
        ><a
          href="https://huggingface.co/datasets/Llamacha/monolingual-quechua-iic"
          class="link"
          target="_blank"
          rel="noopener"
          >Monolingual-Quechua-IIC</a
        ></strong
      >
      dataset were the following:
    </p>

    <figure class="mb-4">
      <img
        src="/images/multilingual-lm-representations/xglm_vs_all_finetuning_methods-2.svg"
        alt="Loss of XGLM-564M vs Fine-tuned Versions"
        class="w-full h-auto object-contain"
      />
      <figcaption class="mt-2">
        <strong>Figure 6:</strong> Loss of the
        <a
          href="https://huggingface.co/facebook/xglm-564M"
          class="link"
          target="_blank"
          rel="noopener"
          >XGLM-564M</a
        >
        model compared to its finetuned versions (FFT meaning Full Fine-Tuning).
      </figcaption>
    </figure>

    <figure class="mb-4">
      <img
        src="/images/multilingual-lm-representations/train_eval_metrics_finetuning-2.svg"
        alt="Performance metrics comparison of finetuning methods in training and validation"
        class="w-full h-auto object-contain"
      />
      <figcaption class="mt-2">
        <strong>Figure 7:</strong> Performance metrics comparison of finetuning methods in training
        and validation.
      </figcaption>
    </figure>

    <h3 class="text-2xl font-bold mb-4">Conclusion</h3>
    <p class="mb-4">
      This project provides insights into multilingual representation spaces (in sentence and
      token-level) for the
      <a
        href="https://huggingface.co/facebook/xglm-564M"
        class="link"
        target="_blank"
        rel="noopener"
        >XGLM-564M</a
      >
      model on an underrepresented language, e.g.,
      <a
        href="https://en.wikipedia.org/wiki/Quechuan_languages"
        class="link"
        target="_blank"
        rel="noopener"
        >Quechua</a
      >, and demonstrates the effectiveness of several fine-tuning techniques. While full
      fine-tuning offers the best performance, methods such as LoRA, BitFit and IA³ offer practical
      alternatives under computational constraints, such as our case.
    </p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

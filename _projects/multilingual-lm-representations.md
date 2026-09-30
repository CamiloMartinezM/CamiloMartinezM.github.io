---
layout: page
title: Multilingual Language Models Representations and Fine-Tuning
description: This study evaluates multilingual representation spaces using XGLM-564M and GPT-2 on the FLORES-200 dataset, focusing on English, Spanish, German, Arabic, Tamil, and Quechua.
img: assets/img/projects/multilingual-lm-representations/icon.png
importance: 2
_styles: >
  .post-header .post-description { display: none; }
  .figure-grid { display: grid; gap: 1rem; align-items: start; }
  .figure-grid img { width: 100%; height: auto; }
  @media (min-width: 768px) {
    .figure-grid-2 { grid-template-columns: repeat(2, 1fr); }
  }
---

This study evaluates multilingual representation spaces using [XGLM-564M](https://huggingface.co/facebook/xglm-564M) and [GPT-2](https://huggingface.co/openai-community/gpt2) on the **[FLORES-200](https://huggingface.co/datasets/facebook/flores)** dataset, focusing on **English, Spanish, German, Arabic, Tamil, and Quechua**. We analyze hidden representations using PCA with [scikit-learn](https://scikit-learn.org/dev/modules/generated/sklearn.decomposition.PCA.html) and t-SNE with [openTSNE](https://opentsne.readthedocs.io/en/stable/) to visualize and interpret these high-dimensional spaces. We then fine-tune XGLM-564M on the **[Monolingual-Quechua-IIC](https://huggingface.co/datasets/Llamacha/monolingual-quechua-iic)** corpus, comparing four approaches: full fine-tuning, BitFit [\[Zaken et al., 2022\]](https://arxiv.org/abs/2106.10199), LoRA [\[Hu et al., 2021\]](https://arxiv.org/abs/2106.09685), and IA³ [\[Liu et al., 2022\]](https://arxiv.org/abs/2205.05638). Our analysis examines both performance improvements on Quechua and cross-lingual transfer effects.

By: [<u>Camilo Martínez</u>](https://www.linkedin.com/in/camilo-martinez-m/), [Honglu Ma](https://github.com/Kanakanajm)

<p><a href="https://github.com/Kanakanajm/nnti/tree/main"><i class="fa-brands fa-github"></i> View on GitHub</a></p>

We evaluated the models: [XGLM-564M](https://huggingface.co/facebook/xglm-564M), a multilingual autoregressive language model (with 564 million parameters) trained on a balanced corpus of a diverse set of 30 languages totaling 500 billion sub-tokens, and [GPT-2](https://huggingface.co/openai-community/gpt2), a transformers model pretrained on a very large corpus of English data in a self-supervised fashion. As evaluation dataset, we used the famous **[FLORES-200](https://huggingface.co/datasets/facebook/flores)** dataset, available on [HuggingFace](https://huggingface.co/), specifically on six languages: **English, Spanish, German, Arabic, Tamil, and Quechua**.

We analyzed the multilingual embeddings (both sentence-level and token-level) from both pre-trained language models using dimensionality reduction techniques: PCA with [scikit-learn](https://scikit-learn.org/dev/modules/generated/sklearn.decomposition.PCA.html) and t-SNE with [openTSNE](https://opentsne.readthedocs.io/en/stable/).

Finally, we finetuned the [XGLM-564M](https://huggingface.co/facebook/xglm-564M) model on a specific language: [Quechua](https://en.wikipedia.org/wiki/Quechuan_languages) with a dataset the model hadn't seen before, **[Monolingual-Quechua-IIC](https://huggingface.co/datasets/Llamacha/monolingual-quechua-iic)**, a monolingual corpus of Southern Quechua, consisting of nearly `450K` segments [\[Zevallos et al., 2022\]](https://aclanthology.org/2022.deeplo-1.1.pdf). We used different fine-tuning methods: full fine-tuning, BitFit [\[Zaken et al., 2022\]](https://arxiv.org/abs/2106.10199), LoRA [\[Hu et al., 2021\]](https://arxiv.org/abs/2106.09685), and IA³ [\[Liu et al., 2022\]](https://arxiv.org/abs/2205.05638) and analyzed their performance and evaluation loss on the six languages mentioned above to see how much the performance on the **Quechua** language improved, and whether it decreased for the rest.

## Experiments and Analyses

We first compared the performance of the [XGLM-564M](https://huggingface.co/facebook/xglm-564M) model with [GPT-2](https://huggingface.co/openai-community/gpt2), in terms of _Mean Language Modeling Loss_.

<figure>
<img src="/assets/img/projects/multilingual-lm-representations/xglm_vs_gpt2_mean_losses.jpg" alt="Loss of XGLM-564M compared to GPT-2" class="img-fluid">
<figcaption class="caption"><strong>Figure 1:</strong> Loss of the <a href="https://huggingface.co/facebook/xglm-564M">XGLM-564M</a> model compared to GPT-2, on the original languages. Both struggle with <code>quy_Latn</code> (Quechua).</figcaption>
</figure>

Afterwards, we visualized the hidden representations of both the [XGLM-564M](https://huggingface.co/facebook/xglm-564M) model using PCA and t-SNE for both sentence-level and token-level embeddings across all layers of the model. Below are visualizations from our experiments, which clearly show the progression of how the model learns to better separate the languages as we move to deeper layers:

<figure>
<div class="figure-grid figure-grid-2">
<div>
<img src="/assets/img/projects/multilingual-lm-representations/sentence_xglm-564M_layer_0_t-SNE.png" alt="t-SNE Visualization of Sentences in Layer 24">
<figcaption class="caption"><strong>Figure 2:</strong> t-SNE Visualization of Sentences for Layer 0.</figcaption>
</div>
<div>
<img src="/assets/img/projects/multilingual-lm-representations/sentence_xglm-564M_layer_24_t-SNE.png" alt="PCA Visualization of Sentences in Layer 24">
<figcaption class="caption"><strong>Figure 3:</strong> t-SNE Visualization of Sentences for Layer 24.</figcaption>
</div>
</div>
</figure>

<figure>
<div class="figure-grid figure-grid-2">
<div>
<img src="/assets/img/projects/multilingual-lm-representations/token_xglm-564M_layer_0_t-SNE.png" alt="t-SNE Visualization of Tokens in Layer 24">
<figcaption class="caption"><strong>Figure 4:</strong> t-SNE Visualization of Tokens for Layer 0.</figcaption>
</div>
<div>
<img src="/assets/img/projects/multilingual-lm-representations/token_xglm-564M_layer_24_t-SNE.png" alt="PCA Visualization of Tokens in Layer 24">
<figcaption class="caption"><strong>Figure 5:</strong> t-SNE Visualization of Tokens for Layer 24.</figcaption>
</div>
</div>
</figure>

Finally, the results for the finetuning of the [XGLM-564M](https://huggingface.co/facebook/xglm-564M) model on the **[Monolingual-Quechua-IIC](https://huggingface.co/datasets/Llamacha/monolingual-quechua-iic)** dataset were the following:

<figure>
<img src="/assets/img/projects/multilingual-lm-representations/xglm_vs_all_finetuning_methods.jpg" alt="Loss of XGLM-564M vs Fine-tuned Versions" class="img-fluid">
<figcaption class="caption"><strong>Figure 6:</strong> Loss of the <a href="https://huggingface.co/facebook/xglm-564M">XGLM-564M</a> model compared to its finetuned versions (FFT meaning Full Fine-Tuning).</figcaption>
</figure>

<figure>
<img src="/assets/img/projects/multilingual-lm-representations/train_eval_metrics_finetuning.jpg" alt="Performance metrics comparison of finetuning methods in training and validation" class="img-fluid">
<figcaption class="caption"><strong>Figure 7:</strong> Performance metrics comparison of finetuning methods in training and validation.</figcaption>
</figure>

### Conclusion

This project provides insights into multilingual representation spaces (in sentence and token-level) for the [XGLM-564M](https://huggingface.co/facebook/xglm-564M) model on an underrepresented language, e.g., [Quechua](https://en.wikipedia.org/wiki/Quechuan_languages), and demonstrates the effectiveness of several fine-tuning techniques. While full fine-tuning offers the best performance, methods such as LoRA, BitFit and IA³ offer practical alternatives under computational constraints, such as our case.

_For more details, please refer to the project's [GitHub repository](https://github.com/Kanakanajm/nnti/tree/main)._

<template>
  <div>
    <p class="mb-4">
      This system automates <strong>chord recognition</strong> from acoustic guitar videos by
      detecting and classifying chords based on video input. It leverages <strong>YOLO</strong>
      <a href="https://arxiv.org/abs/1506.02640" class="link" target="_blank" rel="noopener">
        [Redmon et al., 2016]
      </a>
      and <strong>Faster R-CNN</strong>
      <a href="https://arxiv.org/abs/1506.01497" class="link" target="_blank" rel="noopener">
        [Ren et al., 2016]
      </a>
      for <em>fretboard</em> detection, allowing the system to identify the position of the hand and
      fingers on the guitar neck. For chord classification, it utilizes
      <strong>Vision Transformers</strong>
      <a href="https://arxiv.org/abs/2010.11929" class="link" target="_blank" rel="noopener">
        [Dosovitskiy et al., 2020]
      </a>
      and <strong>DINOv2</strong>
      <a href="https://arxiv.org/abs/2304.07193" class="link" target="_blank" rel="noopener">
        [Oquab et al.]
      </a>
      , which process visual cues to distinguish between different chords. Additionally,
      <strong>hand pose estimation</strong> with
      <a
        href="https://github.com/google-ai-edge/mediapipe"
        class="link"
        target="_blank"
        rel="noopener"
        >MediaPipe</a
      >
      was explored as a potential method to perform chord recognition. Finally, we extend the work
      from
      <a
        href="https://ph01.tci-thaijo.org/index.php/ecticit/article/view/254624"
        class="link"
        target="_blank"
        rel="noopener"
      >
        [Kristian et al., 2024]
      </a>
      by exploring the potential of using state-of-the-art deep learning models and techniques with
      an additional proposal for an audio generation module.
    </p>

    <p class="mb-4">
      This system was created
      <a href="https://dhimitriosduka1.github.io/" target="_blank" class="link" rel="noopener"
        >Dhimitrios Duka</a
      >,
      <a href="https://github.com/Kanakanajm" target="_blank" class="link" rel="noopener"
        >Honglu Ma</a
      >
      and myself, as the final project for the
      <a
        href="https://www.mpi-inf.mpg.de/departments/computer-vision-and-machine-learning/teaching/courses-1/ss-2024-high-level-computer-vision"
        class="link"
        target="_blank"
        rel="noopener"
      >
        High-Level Computer Vision
      </a>
      course lectured by
      <a
        href="https://www.mpi-inf.mpg.de/departments/computer-vision-and-machine-learning/people/bernt-schiele"
        class="link"
        target="_blank"
        rel="noopener"
      >
        Prof. Dr. Bernt Schiele
      </a>
      at
      <a href="https://www.uni-saarland.de/" class="link" target="_blank" rel="noopener">
        Saarland University
      </a>
      during the Sommer Semester 2024.
    </p>

    <section class="section">
      <h2 class="subsection">Fretboard Detection</h2>
      <p class="mb-4">
        The table below shows the performance metrics of the different models tested on the
        finetuning dataset (<a
          href="https://universe.roboflow.com/hubert-drapeau-qt6ae/guitar-necks-detector/dataset/1"
          class="link"
          target="_blank"
          rel="noopener"
          >Guitar necks detector</a
        >), and the figure below shows the Recall vs. mAP@50 for the models tested and finetuned on
        the <em>fretboard</em> class, while showcasing the number of parameters. Naturally, the
        models finetuned with a Frozen Backbone (FB) performed slightly worse than the models
        finetuned without a Frozen Backbone; this was expected since the latter had the advantage of
        being able to learn the new task from scratch, using all layers, while the former only
        trained a smaller classifier head. Since we wanted to retain the ability to recognize the
        other 80 valuable classes from the
        <a href="https://cocodataset.org/#home" class="link" target="_blank" rel="noopener"
          >COCO dataset</a
        >, we chose a model from the (FB) list, the YOLOv9 (FB) model, as the best model for our
        task. This model obtained the highest precision and, after re-evaluating on the COCO dataset
        + <em>fretboard class</em>, it delivered better results in terms of confusion matrix and
        Precision-Recall curve.
      </p>

      <table
        class="w-full border-collapse mb-4 border-t-4 border-b-4 border-black dark:border-white"
      >
        <caption class="mb-2 text-left">
          <strong>Table 1:</strong>
          Performance metrics of different models on the evaluation dataset, shown in percentages.
          Each column represents a specific metric: Precision, Recall, mAP50-95, and mAP50. (FB)
          denotes models fine-tuned with a Frozen Backbone.
        </caption>
        <thead>
          <tr class="border-t-2 border-b-2 p-1 border-black dark:border-white">
            <th>
              <strong>Model</strong>
            </th>
            <th>
              <strong>P</strong>
            </th>
            <th>
              <strong>R</strong>
            </th>
            <th>
              <strong>mAP50-95</strong>
            </th>
            <th>
              <strong>mAP50</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-gray-100 dark:hover:bg-gray-800">
            <td>
              <a
                href="https://github.com/autogyro/yolo-V8"
                target="_blank"
                rel="noopener"
                class="link"
                >YOLOv8 (m)</a
              >
            </td>
            <td><strong>98.9%</strong></td>
            <td>93.0%</td>
            <td><strong>88.7%</strong></td>
            <td><strong>98.2%</strong></td>
          </tr>
          <tr class="hover:bg-gray-100 dark:hover:bg-gray-800">
            <td>
              <a
                href="https://github.com/WongKinYiu/yolov9"
                target="_blank"
                rel="noopener"
                class="link"
                >YOLOv9 (c)</a
              >
            </td>
            <td>96.4%</td>
            <td><strong>96.8%</strong></td>
            <td>85.3%</td>
            <td>97.8%</td>
          </tr>
          <tr class="hover:bg-gray-100 dark:hover:bg-gray-800">
            <td>
              <a
                href="https://github.com/THU-MIG/yolov10"
                target="_blank"
                rel="noopener"
                class="link"
                >YOLOv10 (l)</a
              >
            </td>
            <td>94.2%</td>
            <td>87.0%</td>
            <td>80.0%</td>
            <td>94.4%</td>
          </tr>
          <tr class="hover:bg-gray-100 dark:hover:bg-gray-800">
            <td>
              <a
                href="https://pytorch.org/vision/master/models/generated/torchvision.models.detection.fasterrcnn_resnet50_fpn.html#fasterrcnn-resnet50-fpn"
                target="_blank"
                rel="noopener"
                class="link"
                >Faster-RCNN-Resnet50</a
              >
            </td>
            <td>80.8%</td>
            <td>82.4%</td>
            <td>77.5%</td>
            <td>94.0%</td>
          </tr>
          <tr class="hover:bg-gray-100 dark:hover:bg-gray-800">
            <td>
              <a
                href="https://pytorch.org/vision/master/models/generated/torchvision.models.detection.fasterrcnn_mobilenet_v3_large_fpn.html#fasterrcnn-mobilenet-v3-large-fpn"
                target="_blank"
                rel="noopener"
                >Faster-RCNN-MobileNetv3</a
              >
            </td>
            <td>79.4%</td>
            <td>81.6%</td>
            <td>75.7%</td>
            <td>94.9%</td>
          </tr>
          <tr class="hover:bg-gray-100 dark:hover:bg-gray-800">
            <td>YOLOv8 (FB)</td>
            <td>76.7%</td>
            <td><strong>85.1%</strong></td>
            <td>53.4%</td>
            <td>87.8%</td>
          </tr>
          <tr class="hover:bg-gray-100 dark:hover:bg-gray-800">
            <td>YOLOv9 (FB)</td>
            <td><strong>82.4%</strong></td>
            <td>74.7%</td>
            <td>54.7%</td>
            <td>87.0%</td>
          </tr>
          <tr class="hover:bg-gray-100 dark:hover:bg-gray-800">
            <td>YOLOv10 (FB)</td>
            <td>81.4%</td>
            <td>84.0%</td>
            <td><strong>71.2%</strong></td>
            <td>89.9%</td>
          </tr>
          <tr class="hover:bg-gray-100 dark:hover:bg-gray-800">
            <td>Faster-RCNN-Resnet50 (FB)</td>
            <td>62.9%</td>
            <td>66.3%</td>
            <td>59.0%</td>
            <td><strong>93.4%</strong></td>
          </tr>
          <tr class="hover:bg-gray-100 dark:hover:bg-gray-800">
            <td>Faster-RCNN-MobileNetv3 (FB)</td>
            <td>71.7%</td>
            <td>73.6%</td>
            <td>68.3%</td>
            <td>93.0%</td>
          </tr>
        </tbody>
      </table>

      <figure>
        <img src="/images/strings-to-sequences/recall_vs_map50.jpg" alt="Recall vs mAP@50" />
        <figcaption class="mt-2">
          <strong>Figure 1:</strong> Recall vs. mAP@50 for the models tested and finetuned on the
          <em>fretboard</em> class.
        </figcaption>
      </figure>

      <!-- <p class="mb-4 mt-4">
        Since our YOLOv9 (c) model did not lose its capability to detect the original 80 classes
        from the
        <a href="https://cocodataset.org/#home" class="link" target="_blank" rel="noopener"
          >COCO dataset</a
        >, we decided to re-evaluate its performance on the whole dataset to quantify how much the
        finetuning process affected the original pre-trained model's performance. The results are
        shown below, where positive values are desirable for diagonal entries (indicating correct
        classifications), and negative values are preferred for off-diagonal entries (indicating
        reduced misclassifications).
      </p>

      <figure class="mb-4">
        <img
          src="/images/strings-to-sequences/confusion_matrix_subset.png"
          alt="Recall vs mAP@50"
        />
        <figcaption>
          <strong>Figure 2:</strong> Subset of the confusion matrix of the chosen YOLOv9 (c) model
          on the
          <a href="https://cocodataset.org/#home" class="link" target="_blank" rel="noopener"
            >COCO dataset</a
          >. There, we can see that the accuracy on the <em>fretboard</em> class was ~91%.
        </figcaption>
      </figure>

      <figure class="mt-4">
        <img
          src="/images/strings-to-sequences/difference_confusion_matrix.png"
          alt="Recall vs mAP@50"
        />
        <figcaption>
          <strong>Figure 3:</strong> Finetuned YOLOv9 (c) - Baseline on COCO dataset. Given the
          appearance of this confusion matrix, constructed by the difference between the finetuned
          model and the original model, we can see that there are not many red entries in the
          diagonal, and actually some green entries in off-diagonal entries. This means the model
          did not lose its capability to detect the original 80 classes from the
          <a href="https://cocodataset.org/#home" class="link" target="_blank" rel="noopener"
            >COCO dataset</a
          >, (even improving in some cases), while still being able to detect a new
          <em>fretboard</em> class.
        </figcaption>
      </figure>
    </section> -->

      <section class="section">
        <div>
          <h2 class="subsubsection">Qualitative Results</h2>
          <p class="mb-4">
            Some qualitative results are shown below, comparing the original YOLOv9 (c) prediction
            with the finetuned model and the model with a frozen backbone + classifier layer.
          </p>

          <div class="space-y-4">
            <!-- First set of images -->
            <figure>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <img
                  src="/images/strings-to-sequences/other-image-original.jpg"
                  alt="Original YOLOv9 prediction"
                  class="w-full h-auto object-contain"
                />
                <img
                  src="/images/strings-to-sequences/other-image-non-frozen.jpg"
                  alt="Full-finetuning"
                  class="w-full h-auto object-contain"
                />
                <img
                  src="/images/strings-to-sequences/other-image-finetuned.jpg"
                  alt="Frozen backbone + Classifier layer"
                  class="w-full h-auto object-contain"
                />
              </div>
              <figcaption class="mt-2 text-justify text-base">
                <strong>Figure 2</strong>: Comparison of YOLOv9 (c) predictions with different
                training approaches.
                <span class="hidden md:inline"
                  >From <strong>left</strong> to <strong>right</strong></span
                ><span class="md:hidden">From <strong>top</strong> to <strong>bottom</strong></span
                >: original prediction, with full-finetuning, and with a frozen backbone +
                classifier layer.
              </figcaption>
            </figure>

            <!-- Second set of images -->
            <figure>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <img
                  src="/images/strings-to-sequences/dhimitrios-non-frozen.jpg"
                  alt="With full-finetuning"
                  class="w-full h-auto object-contain"
                />
                <img
                  src="/images/strings-to-sequences/dhimitrios.jpg"
                  alt="Frozen backbone + Classifier layer"
                  class="w-full h-auto object-contain"
                />
              </div>
              <figcaption class="mt-2 text-justify text-base">
                <strong>Figure 3</strong>: Comparison of full-finetuning vs. frozen backbone with
                classifier layer. <span class="hidden md:inline"><strong>Left</strong></span
                ><span class="md:hidden"><strong>Top</strong></span
                >: with full-finetuning, <span class="hidden md:inline"><strong>right</strong></span
                ><span class="md:hidden"><strong>bottom</strong></span
                >: with frozen backbone + classifier layer.
              </figcaption>
            </figure>

            <!-- Third set of images -->
            <figure>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 align-middle items-center">
                <img
                  src="/images/strings-to-sequences/output_normal_image.jpg"
                  alt="Prediction on an image from the COCO dataset"
                  class="w-full h-auto object-contain"
                />
                <img
                  src="/images/strings-to-sequences/other-image-2-finetuned.jpg"
                  alt="From the Penn-Fudan dataset"
                  class="w-full h-auto object-contain"
                />
              </div>
              <figcaption class="mt-2 text-justify text-base">
                <strong>Figure 4</strong>: Model predictions on different datasets.
                <span class="hidden md:inline"><strong>Left</strong></span
                ><span class="md:hidden"><strong>Top</strong></span
                >: prediction on an image from the
                <a href="https://cocodataset.org/#home" class="link" target="_blank" rel="noopener"
                  >COCO dataset</a
                >, <span class="hidden md:inline"><strong>right</strong></span
                ><span class="md:hidden"><strong>bottom</strong></span
                >: from the
                <a
                  href="https://www.cis.upenn.edu/~jshi/ped_html/"
                  class="link"
                  target="_blank"
                  rel="noopener"
                  >Penn-Fudan dataset</a
                >.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
    </section>

    <section class="section">
      <h2 class="subsection">Guitar Chord Classification</h2>
      <h2 class="subsubsection">Hand Pose Estimation + Classifier</h2>
      <p class="mb-4">
        To evaluate our approach against those in our reference paper by
        <a
          href="https://ph01.tci-thaijo.org/index.php/ecticit/article/view/254624"
          class="link"
          target="_blank"
          rel="noopener"
        >
          [Kristian et al., 2024] </a
        >, we implemented the
        <a href="https://arxiv.org/abs/1602.07261" class="link" target="_blank" rel="noopener">
          InceptionResNetv2</a
        >
        model as described by the authors. After training the model using the hyperparameters
        provided by
        <a
          href="https://ph01.tci-thaijo.org/index.php/ecticit/article/view/254624"
          class="link"
          target="_blank"
          rel="noopener"
        >
          [Kristian et al., 2024]
        </a>
        on our dataset, we obtained the results shown in the table below, which provided us with a
        baseline to compare our models against. Surprisingly, this approach performed well,
        achieving good accuracy during validation and testing on two datasets. However, the model
        struggled to generalize to the third dataset, which was created by us. This outcome was
        anticipated, as the samples in our dataset were out of the training distribution, and the
        model lacked the complexity needed to generalize to such data.
      </p>

      <table
        class="w-full border-collapse mb-4 border-t-4 border-b-4 border-black dark:border-white"
      >
        <caption class="mb-2 text-left">
          <strong>Table 2:</strong>
          Accuracy of the Hand Pose Estimation + Classifier in the test set of different datasets.
          Datasets used:
          <code>GC: Guitar_Chords</code
          >,
          <code>GCT: Guitar_Chords_Tiny</code
          >,
          <code>GCO: Guitar_Chords_Ours</code
          >.
        </caption>
        <thead>
          <tr class="border-t-2 border-b-2 p-1 border-black dark:border-white">
            <th><strong>Model</strong></th>
            <th><strong>GC</strong></th>
            <th><strong>GCT</strong></th>
            <th><strong>GCO</strong></th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-gray-100 dark:hover:bg-gray-800">
            <td>
              <a
                href="https://arxiv.org/abs/1602.07261"
                class="link"
                target="_blank"
                rel="noopener"
              >
                InceptionResNetv2</a
              >
            </td>
            <td>83.56%</td>
            <td>68.63%</td>
            <td>15.57%</td>
          </tr>
          <tr class="hover:bg-gray-100 dark:hover:bg-gray-800">
            <td><code>SVM (C = 300)</code></td>
            <td><strong>95.27%</strong></td>
            <td><strong>85.71%</strong></td>
            <td><strong>18.61%</strong></td>
          </tr>
          <tr class="hover:bg-gray-100 dark:hover:bg-gray-800">
            <td><code>Random Forest (n_estimators = 200)</code></td>
            <td>93.35%</td>
            <td>52.41%</td>
            <td>16.16%</td>
          </tr>
          <tr class="hover:bg-gray-100 dark:hover:bg-gray-800">
            <td><code>MLP (hidden_layer_sizes = (100, 256, 100))</code></td>
            <td>89.44%</td>
            <td>78.57%</td>
            <td>14.39%</td>
          </tr>
        </tbody>
      </table>

      <h2 class="subsubsection">Classifier only approach</h2>
      <p class="mb-4">
        To address this limitation of the previous approach, we decided to explore more complex
        models, such as
        <a href="https://arxiv.org/abs/2010.11929" class="link" target="_blank" rel="noopener">
          Vision Transformers
        </a>
        and
        <a href="https://arxiv.org/abs/2304.07193" class="link" target="_blank" rel="noopener">
          DINOv2</a
        >, which is also available on
        <a
          href="https://huggingface.co/docs/transformers/model_doc/dinov2"
          class="link"
          target="_blank"
          rel="noopener"
        >
          Hugging Face</a
        >. The results of our experiments are summarized below:
      </p>

      <table
        class="w-full border-collapse mb-4 border-t-4 border-b-4 border-black dark:border-white"
      >
        <caption class="mb-2 text-left">
          <strong>Table 3:</strong>
          Accuracy of the Classifier-only approach on the test set of different datasets.
        </caption>
        <thead>
          <tr class="border-t-2 border-b-2 p-1 border-black dark:border-white">
            <th><strong>Model</strong></th>
            <th><strong>GC</strong></th>
            <th><strong>GCT</strong></th>
            <th><strong>GCO</strong></th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-gray-100 dark:hover:bg-gray-800">
            <td>
              <a
                href="https://arxiv.org/abs/1602.07261"
                class="link"
                target="_blank"
                rel="noopener"
              >
                InceptionResNetv2</a
              >
            </td>
            <td>83.56%</td>
            <td>68.63%</td>
            <td>15.57%</td>
          </tr>
          <tr class="hover:bg-gray-100 dark:hover:bg-gray-800">
            <td>ViT-B/16</td>
            <td><strong>98.96%</strong></td>
            <td>85.29%</td>
            <td>96.24%</td>
          </tr>
          <tr class="hover:bg-gray-100 dark:hover:bg-gray-800">
            <td>ViT-B/32</td>
            <td>93.07%</td>
            <td>81.37%</td>
            <td>95.83%</td>
          </tr>
          <tr class="hover:bg-gray-100 dark:hover:bg-gray-800">
            <td>ViT-L/16</td>
            <td>95.84%</td>
            <td>81.37%</td>
            <td>12.29%</td>
          </tr>
          <tr class="hover:bg-gray-100 dark:hover:bg-gray-800">
            <td>ViT-L/32</td>
            <td>77.03%</td>
            <td>43.14%</td>
            <td>13.43%</td>
          </tr>
          <tr class="hover:bg-gray-100 dark:hover:bg-gray-800">
            <td>DINOv2-S</td>
            <td>96.24%</td>
            <td>88.24%</td>
            <td><strong>98.18%</strong></td>
          </tr>
          <tr class="hover:bg-gray-100 dark:hover:bg-gray-800">
            <td>DINOv2-L</td>
            <td>96.44%</td>
            <td><strong>91.18%</strong></td>
            <td>97.92%</td>
          </tr>
        </tbody>
      </table>

      <p class="mb-4">
        ViT models show varying performance across different datasets. The base models perform
        exceptionally well, with high accuracy on all datasets. However, the larger models do not
        exhibit the same performance. We argue that this is happening because the available data is
        not sufficient to train the large version of the models effectively. Additionally, we can
        also observe that the patch 16 versions of the ViT models perform better than the patch 32
        versions. This is likely due to the fact that the patch 16 versions have a higher
        resolution, which is important for accurately distinguishing between different hand
        positions.
      </p>

      <p class="mb-4">
        Moreover, both DINOv2 variants demonstrated strong and consistent performance across all
        datasets. The <code>DINOv2-L</code> model, in particular, achieved the highest accuracy on
        the <code>Guitar_Chords_Ours</code> dataset, slightly outperforming the small variant. The
        superior performance of DINOv2 can be attributed to its self-supervised learning approach.
        Unlike models pre-trained on
        <a href="https://www.image-net.org/" class="link" target="_blank" rel="noopener">ImageNet</a
        >, which does not contain a specific class for <em>hands</em>, DINOv2's self-supervised
        learning enables it to learn more generic and transferable representations, leading to
        better generalization in our task. This enhanced generalization is further supported by
        attention visualizations of the model when applied to images from
        <code>Guitar_Chords_Ours</code> dataset, where the model correctly focuses on the hand
        performing the fretting, as evidenced by the following figures.
      </p>

      <figure class="flex flex-col items-center align-middle mb-4">
        <img
          src="/images/strings-to-sequences/occlusion_untrained.jpg"
          alt="Occlusion in untrained model"
          width="75%"
        />
        <img
          src="/images/strings-to-sequences/occlusion_trained.jpg"
          alt="Occlusion in trained model"
          width="75%"
        />
        <figcaption class="text-justify mt-2">
          <strong>Figure 5:</strong> Occlusion-based attribution
          <a href="https://arxiv.org/abs/2009.07896" class="link" target="_blank" rel="noopener"
            >[Kokhlikyan et al., 2020]</a
          >
          for model interpretability on a <code>74×389</code> input image using a stride of
          <code>8</code> and a sliding window of <code>30×30</code>, using
          <a
            href="https://captum.ai/tutorials/TorchVision_Interpret#3--Occlusion-based-attribution"
            class="link"
            target="_blank"
            rel="noopener"
            >Captum</a
          >. <strong>Top:</strong> Untrained DINOv2 model. <strong>Bottom:</strong> Our DINOv2
          model.
        </figcaption>
      </figure>

      <figure class="flex flex-col mb-4 align-middle items-center">
        <img
          src="/images/strings-to-sequences/occlusion_trained_full.jpg"
          alt="Occlusion in trained model - full picture"
          width="75%"
        />
        <figcaption class="text-justify mt-2">
          <strong>Figure 6:</strong> Our DINOv2 model on a <code>360×640</code> input image using a
          stride of <code>20</code> and a sliding window of <code>60×60</code>.
        </figcaption>
      </figure>

      <p>
        Overall, our proposed models outperformed the
        <a href="https://arxiv.org/abs/1602.07261" class="link" target="_blank" rel="noopener">
          InceptionResNetv2</a
        >
        model, achieving higher accuracy across all datasets. This demonstrates the potential of
        using more advanced models for
        <span class="text-highlighted">chord classification tasks</span>.
      </p>
    </section>
  </div>
</template>

<style scoped>
th,
td {
  padding: 4px;
}
th {
  text-align: center;
}
tr,
td {
  text-align: center;
}
th:first-child {
  text-align: left;
}
tr td:first-child {
  text-align: left;
}
table caption {
  margin-bottom: 8px;
  text-align: justify;
}
</style>

<script setup lang="ts">
// Add any necessary imports and logic here
</script>

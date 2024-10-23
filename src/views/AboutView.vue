<script setup lang="ts">
// You can add any necessary imports or logic here
</script>

<template>
  <main class="flex flex-col min-h-full p-4 dark:bg-body dark:text-white text-justify">
    <div class="max-w-4xl mx-auto w-full">
      <div class="content-wrapper">
        <h1 class="text-4xl font-bold mb-2 text-center">
          <span class="font-semibold">Camilo</span> <span class="font-light">Martínez</span>
        </h1>
        <p class="text-xl mb-4 text-center">
          M.Sc. Student @<a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.uni-saarland.de/en/home.html"
            class="link"
            >Saarland University</a
          >
        </p>

        <div class="image-wrapper">
          <img src="/images/profile-picture.jpg" alt="Camilo Martínez" class="profile-image" />
        </div>

        <p class="mb-4 text-lg">
          Hello there! I'm a Master's student of
          <a
            href="https://saarland-informatics-campus.de/en/studium-studies/data-science-and-artificial-intelligence-master/"
            class="link"
            target="_blank"
            rel="noopener noreferrer"
            >Data Science and Artificial Intelligence</a
          >
          at Saarland University, Germany. I am also a Mechanical Engineer with a Minor in
          Computational Mathematics from
          <a
            href="https://en.wikipedia.org/wiki/University_of_the_Andes_(Colombia)"
            class="link"
            target="_blank"
            rel="noopener noreferrer"
            >Universidad de los Andes</a
          >, Colombia.
        </p>
        <p class="mb-4 text-lg">
          Currently, I am a Research Assistant at the
          <a
            href="https://www.linkedin.com/company/dfki/posts/?feedView=all"
            class="link"
            target="_blank"
            rel="noopener noreferrer"
            >Deutsches Forschungszentrum für Künstliche Intelligenz (DFKI)</a
          >, researching Machine Learning approaches for automated analysis, feature extraction and
          classification of EEG signals and eye-tracking data in realistic settings for improving
          Brain-Computer Interfaces. I am also a Tutor of the WiSe2024/25 course
          <a
            href="https://cms.sic.saarland/eml24/"
            class="link"
            target="_blank"
            rel="noopener noreferrer"
            >Elements of Machine Learning</a
          >
          lectured by Prof. Dr. Isabel Valera and Dr. Kavya Gupta.
        </p>

        <p class="mb-4 text-lg">
          Before that, I was a Functional Consultant at
          <a
            href="https://www.linkedin.com/company/indra/posts/?feedView=all"
            class="link"
            target="_blank"
            rel="noopener noreferrer"
            >Indra</a
          >, where I oversaw a team to enhance utility companies' operational abilities to align
          with the Industry 4.0, namely, AFINIA in Colombia, Agua de Puebla in Mexico and Sedapal in
          Peru.
        </p>

        <h2 class="text-2xl font-bold mt-8 mb-4">Research Interests</h2>
        <ul class="list-disc list-inside mb-4 text-lg">
          <li>Computer Vision (<em>Robotics</em> &amp; <em>Autonomous Driving</em>)</li>
          <li>Large Vision and Language Models</li>
          <li>Model-based Machine Learning</li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style scoped>
.content-wrapper {
  position: relative;
  overflow: hidden; /* Ensures float doesn't break layout */
}

.image-wrapper {
  float: right;
  width: 25%;
  max-width: 300px;
  margin-left: 20px;
  margin-bottom: 10px;
}

.profile-image {
  width: 100%;
  height: auto;
  border-radius: 10%;
}

@media (max-width: 768px) {
  .image-wrapper {
    float: none;
    width: 100%;
    max-width: 150px;
    margin: 0 auto 20px;
  }
}

@media (min-width: 769px) {
  .content-wrapper::after {
    content: '';
    display: table;
    clear: both;
  }
}
</style>

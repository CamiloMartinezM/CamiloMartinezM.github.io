<template>
  <p>
    <span class="text-highlighted">Rend-a-Pixel</span> is a raytracing rendering engine developed on
    top of the <span class="text-highlighted">Lightwave</span> Framework as the final project for
    the
    <a href="https://graphics.cg.uni-saarland.de/" class="link" target="_blank" rel="noopener"
      >Computer Graphics course at Saarland University</a
    >
    lectured by
    <a
      href="https://graphics.cg.uni-saarland.de/people/slusallek.html"
      class="link"
      target="_blank"
      rel="noopener"
      >Prof. Dr.-Ing. Philipp Slusallek
    </a>
    during the Winter Semester 2023/2024. Some of the implemented features are showcased below:
  </p>
  <p class="text-sm mt-4 text-gray-700 italic dark:text-gray-400">
    These dynamic images are not yet fully responsive so they are better viewed on a Desktop
    <span style="font-style: normal">:)</span>
  </p>
  <section class="section">
    <div>
      <h2 class="subsection">Area Lights</h2>
      <TwentyTwenty>
        <img src="/images/rend-a-pixel/area_lights/no_area_lights_ref.jpeg" alt="No area lights" />
        <img
          src="/images/rend-a-pixel/area_lights/area_lights_sphere_uniform_sampling.jpeg"
          alt="Uniform sphere sampling"
        />
        <img
          src="/images/rend-a-pixel/area_lights/area_lights_sphere_cosine_weighted_sampling.jpeg"
          alt="Cosine-weighted sampling"
        />
        <img
          src="/images/rend-a-pixel/area_lights/area_lights_sphere_subtended_cone_sampling.jpeg"
          alt="Subtended-cone sampling"
        />
      </TwentyTwenty>
    </div>
  </section>

  <!-- Shading Normals -->
  <section class="section">
    <div>
      <h2 class="subsection">Shading Normals</h2>
      <TwentyTwenty>
        <img
          src="/images/rend-a-pixel/shading_normals/no_normal_mapping.jpeg"
          alt="No normal mapping"
        />
        <img src="/images/rend-a-pixel/shading_normals/normal_mapping.jpeg" alt="Normal mapping" />
      </TwentyTwenty>
    </div>
  </section>

  <!-- A Thinlens Camera Model -->
  <section class="section">
    <div>
      <h2 class="subsection">A Thinlens Camera Model</h2>
      <TwentyTwenty>
        <img
          src="/images/rend-a-pixel/thinlens_camera_model/no_thinlens_ducks.jpg"
          alt="Perspective"
        />
        <img
          src="/images/rend-a-pixel/thinlens_camera_model/thinlens_ducks.jpg"
          alt="Perspective with Thinlens"
        />
      </TwentyTwenty>
    </div>
  </section>

  <!-- Alpha Masking -->
  <section class="section">
    <div>
      <h2 class="subsection">Alpha Masking</h2>
      <TwentyTwenty>
        <img
          src="/images/rend-a-pixel/alpha_masking/no_alpha_masking.jpeg"
          alt="No alpha masking"
        />
        <img src="/images/rend-a-pixel/alpha_masking/alpha_masking.jpeg" alt="Alpha masking" />
      </TwentyTwenty>
    </div>
  </section>

  <!-- Image Denoising -->
  <section class="section">
    <div>
      <h2 class="subsection">Image Denoising</h2>
      <TwentyTwenty>
        <img src="/images/rend-a-pixel/denoising/noisy_pathtracing_lights.jpeg" alt="Noisy" />
        <img src="/images/rend-a-pixel/denoising/denoised_pathtracing_lights.jpeg" alt="Denoised" />
      </TwentyTwenty>
    </div>
  </section>

  <!-- Halton Sampler -->
  <section class="section">
    <div>
      <h2 class="subsection">Halton Sampler</h2>
      <section>
        <TwentyTwenty>
          <img
            src="/images/rend-a-pixel/halton_sampler/bunny_constant_independent.jpeg"
            alt="Independent sampling"
          />
          <img
            src="/images/rend-a-pixel/halton_sampler/bunny_constant_halton_no_permutation.jpeg"
            alt="Normal Halton sampling"
          />
          <img
            src="/images/rend-a-pixel/halton_sampler/bunny_constant_halton_digit_permutations.jpeg"
            alt="Digit-permutated Halton sampling"
          />
          <img
            src="/images/rend-a-pixel/halton_sampler/bunny_constant_halton_owen_scramble.jpeg"
            alt="Owen-scrambled Halton sampling"
          />
        </TwentyTwenty>
        <TwentyTwenty>
          <img
            src="/images/rend-a-pixel/halton_sampler/bunny_constant_detail_independent.png"
            alt="Independent sampling"
          />
          <img
            src="/images/rend-a-pixel/halton_sampler/bunny_constant_detail_halton.png"
            alt="Normal Halton sampling"
          />
          <img
            src="/images/rend-a-pixel/halton_sampler/bunny_constant_detail_permutedigits.png"
            alt="Digit-permutated Halton sampling"
          />
          <img
            src="/images/rend-a-pixel/halton_sampler/bunny_constant_detail_owen.png"
            alt="Owen-scrambled Halton sampling"
          />
        </TwentyTwenty>
      </section>
    </div>
  </section>

  <!-- Multiple Importance Sampling -->
  <section class="section">
    <div>
      <h2 class="subsection">Multiple Importance Sampling (MIS)</h2>
      <TwentyTwenty>
        <img src="/images/rend-a-pixel/mis_path_tracer/veach_bsdf.jpeg" alt="BSDF sampling" />
        <img
          src="/images/rend-a-pixel/mis_path_tracer/veach_nee.jpeg"
          alt="Next Event Estimation (NEE)"
        />
        <img
          src="/images/rend-a-pixel/mis_path_tracer/veach_mis.jpeg"
          alt="Multiple Importance Sampling (MIS)"
        />
      </TwentyTwenty>
      <p class="text-sm mt-4 text-gray-700 italic dark:text-gray-400">
        Every single image rendered with 128spp. The further improvement on the noise is not because
        of having done 128spp (all three images were rendered with the same spp's), but because of
        the <span class="text-highlighted">Subtended-Cone Sampling</span>.
      </p>
    </div>
  </section>

  <!-- Summary of Features -->
  <section class="section">
    <h2 class="subsection">Summary of Features</h2>
    <section class="two-column-section">
      <div class="column">
        <ul>
          <li>
            <span class="text-green-500">✓</span> Camera Models
            <ul>
              <li><span class="text-green-500">✓</span> Basic Perspective Camera</li>
              <li><span class="text-green-500">✓</span> Thinlens Camera</li>
            </ul>
          </li>
          <li>
            <span class="text-green-500">✓</span> Basic Primitives
            <ul>
              <li><span class="text-green-500">✓</span> Sphere</li>
              <li><span class="text-green-500">✓</span> Rectangles</li>
              <li><span class="text-green-500">✓</span> Triangle/Generic Meshes</li>
            </ul>
          </li>
          <li>
            <span class="text-green-500">✓</span> Integrators
            <ul>
              <li><span class="text-green-500">✓</span> Albedo</li>
              <li><span class="text-green-500">✓</span> Normals</li>
              <li><span class="text-green-500">✓</span> Direct Lighting</li>
              <li><span class="text-green-500">✓</span> Path Tracing</li>
            </ul>
          </li>
          <li>
            <span class="text-green-500">✓</span> BSDFs & Lighting Models:
            <ul>
              <li>
                <span class="text-green-500">✓</span> Materials:
                <ul>
                  <li><span class="text-green-500">✓</span> Diffuse</li>
                  <li><span class="text-green-500">✓</span> Conductor</li>
                  <li><span class="text-green-500">✓</span> Rough Conductor</li>
                  <li><span class="text-green-500">✓</span> Dielectric</li>
                  <li><span class="text-green-500">✓</span> Principled</li>
                </ul>
              </li>
              <li><span class="text-green-500">✓</span> Lambertian Emission</li>
            </ul>
          </li>
          <li>
            <span class="text-green-500">✓</span> Textures:
            <ul>
              <li><span class="text-green-500">✓</span> Checkerboard Texture</li>
              <li><span class="text-green-500">✓</span> Image Texture</li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="column mt-[-1rem] sm:mt-[-0.25rem]">
        <ul>
          <li>
            <span class="text-green-500">✓</span> Lights:
            <ul>
              <li><span class="text-green-500">✓</span> Environment Map</li>
              <li>
                <span class="text-green-500">✓</span> Area Lights
                <ul>
                  <li><span class="text-green-500">✓</span> Uniform Sphere Sampling</li>
                  <li><span class="text-green-500">✓</span> Cosine-Weighted Sampling</li>
                  <li><span class="text-green-500">✓</span> Subtended-Cone Sampling</li>
                </ul>
              </li>
              <li><span class="text-green-500">✓</span> Point Light</li>
              <li><span class="text-green-500">✓</span> Directional Light</li>
            </ul>
          </li>
          <li>
            <span class="text-green-500">✓</span> Sampling:
            <ul>
              <li><span class="text-green-500">✓</span> BSDF Sampling</li>
              <li><span class="text-green-500">✓</span> Next Event Estimation (NEE)</li>
              <li><span class="text-green-500">✓</span> Multiple Importance Sampling (MIS)</li>
            </ul>
          </li>
          <li>
            <span class="text-green-500">✓</span> Image denoising using
            <a href="https://www.openimagedenoise.org/" class="link"
              >Intel&reg; Open Image Denoise</a
            >
          </li>
          <li>
            <span class="text-green-500">✓</span> Acceleration Structures:
            <ul>
              <li><span class="text-green-500">✓</span> SAH Bounding Volume Hierarchy</li>
            </ul>
          </li>
          <li><span class="text-green-500">✓</span> Shading Normals</li>
          <li><span class="text-green-500">✓</span> Alpha Masking</li>
          <li><span class="text-green-500">✓</span> Custom Bokeh Shapes</li>
        </ul>
      </div>
    </section>
  </section>

  <!-- Copyright & Credits -->
  <section class="section">
    <h2 class="subsection">Copyright & Credits</h2>
    <p>
      &copy; The Lightwave Framework was written by
      <a
        href="https://graphics.cg.uni-saarland.de/people/rath.html"
        class="link"
        target="_blank"
        rel="noopener"
        >Alexander Rath</a
      >, with contributions from
      <a
        href="https://graphics.cg.uni-saarland.de/people/yazici.html"
        class="link"
        target="_blank"
        rel="noopener"
        >Ömercan Yazici</a
      >
      and
      <a
        href="https://graphics.cg.uni-saarland.de/people/weier.html"
        class="link"
        target="_blank"
        rel="noopener"
        >Philippe Weier</a
      >. Their support was invaluable in the coding of these features. The scenes showcasing the
      features were provided by their team, and should be used under permission. Many textures and
      models were taken from
      <a href="https://polyhaven.com" class="link" target="_blank" rel="noopener">Poly Haven</a>'s
      extensive library. Many thanks to the team behind
      <a href="https://github.com/Tom94/tev" class="link" target="_blank" rel="noopener">Tev</a>
      used extensively throughout this project as an EXR viewer.
    </p>
  </section>
</template>

<script setup lang="ts">
import TwentyTwenty from '@/components/TwentyTwenty.vue'
import { ref } from 'vue'

const options = ref({
  default_offset_pct_x: 0.5,
  default_offset_pct_y: 0.5,
  click_needed: false
})
</script>

<style scoped>
.two-column-section {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.column {
  flex: 1;
  min-width: 300px;
}
ul {
  list-style-type: none;
  padding-left: 0;
}
li {
  margin-bottom: 10px;
}
ul ul {
  padding-left: 20px;
}
</style>

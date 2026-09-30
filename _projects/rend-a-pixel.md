---
layout: page
title: Rend-a-Pixel Raytracer
description: A physically-based renderer implementing various ray tracing techniques.
img: assets/img/projects/rend-a-pixel/icon.png
importance: 3
_styles: >
  .post-header .post-description { display: none; }
  .text-highlighted { color: var(--global-theme-color); }
  .two-column-section { display: flex; flex-wrap: wrap; gap: 20px; }
  .column { flex: 1; min-width: min(300px, 100%); }
  .column ul { list-style: none; padding-left: 0; }
  .column ul ul { padding-left: 20px; }
  .column li { margin-bottom: 10px; }
  .check { color: #22c55e; }
---

<div hidden><link rel="stylesheet" href="/assets/css/compare.css"><script defer src="/assets/js/compare.js"></script></div>

A physically-based renderer implementing various ray tracing techniques. Features include image denoising, normal mapping, multiple importance sampling, support for various material, texture types and lighting conditions, and many more.

By: [<u>Camilo Martínez</u>](https://www.linkedin.com/in/camilo-martinez-m/)

<p><a href="https://github.com/CamiloMartinezM/rend-a-pixel"><i class="fa-brands fa-github"></i> View on GitHub</a></p>

<span class="text-highlighted">Rend-a-Pixel</span> is a raytracing rendering engine developed on top of the <span class="text-highlighted">Lightwave</span> Framework as the final project for the [Computer Graphics course at Saarland University](https://graphics.cg.uni-saarland.de/) lectured by [Prof. Dr.-Ing. Philipp Slusallek](https://graphics.cg.uni-saarland.de/people/slusallek.html) during the Winter Semester 2023/2024. Some of the implemented features are showcased below:

## Area Lights

<div class="compare">
<img src="/assets/img/projects/rend-a-pixel/area_lights/no_area_lights_ref.jpeg" alt="No area lights">
<img src="/assets/img/projects/rend-a-pixel/area_lights/area_lights_sphere_uniform_sampling.jpeg" alt="Uniform sphere sampling">
<img src="/assets/img/projects/rend-a-pixel/area_lights/area_lights_sphere_cosine_weighted_sampling.jpeg" alt="Cosine-weighted sampling">
<img src="/assets/img/projects/rend-a-pixel/area_lights/area_lights_sphere_subtended_cone_sampling.jpeg" alt="Subtended-cone sampling">
</div>

## Shading Normals

<div class="compare">
<img src="/assets/img/projects/rend-a-pixel/shading_normals/no_normal_mapping.jpeg" alt="No normal mapping">
<img src="/assets/img/projects/rend-a-pixel/shading_normals/normal_mapping.jpeg" alt="Normal mapping">
</div>

## A Thinlens Camera Model

<div class="compare">
<img src="/assets/img/projects/rend-a-pixel/thinlens_camera_model/no_thinlens_ducks.jpg" alt="Perspective">
<img src="/assets/img/projects/rend-a-pixel/thinlens_camera_model/thinlens_ducks.jpg" alt="Perspective with Thinlens">
</div>

## Alpha Masking

<div class="compare">
<img src="/assets/img/projects/rend-a-pixel/alpha_masking/no_alpha_masking.jpeg" alt="No alpha masking">
<img src="/assets/img/projects/rend-a-pixel/alpha_masking/alpha_masking.jpeg" alt="Alpha masking">
</div>

## Image Denoising

<div class="compare">
<img src="/assets/img/projects/rend-a-pixel/denoising/noisy_pathtracing_lights.jpeg" alt="Noisy">
<img src="/assets/img/projects/rend-a-pixel/denoising/denoised_pathtracing_lights.jpeg" alt="Denoised">
</div>

## Halton Sampler

<div class="compare">
<img src="/assets/img/projects/rend-a-pixel/halton_sampler/bunny_constant_independent.jpeg" alt="Independent sampling">
<img src="/assets/img/projects/rend-a-pixel/halton_sampler/bunny_constant_halton_no_permutation.jpeg" alt="Normal Halton sampling">
<img src="/assets/img/projects/rend-a-pixel/halton_sampler/bunny_constant_halton_digit_permutations.jpeg" alt="Digit-permutated Halton sampling">
<img src="/assets/img/projects/rend-a-pixel/halton_sampler/bunny_constant_halton_owen_scramble.jpeg" alt="Owen-scrambled Halton sampling">
</div>

<div class="compare">
<img src="/assets/img/projects/rend-a-pixel/halton_sampler/bunny_constant_detail_independent.png" alt="Independent sampling">
<img src="/assets/img/projects/rend-a-pixel/halton_sampler/bunny_constant_detail_halton.png" alt="Normal Halton sampling">
<img src="/assets/img/projects/rend-a-pixel/halton_sampler/bunny_constant_detail_permutedigits.png" alt="Digit-permutated Halton sampling">
<img src="/assets/img/projects/rend-a-pixel/halton_sampler/bunny_constant_detail_owen.png" alt="Owen-scrambled Halton sampling">
</div>

## Multiple Importance Sampling (MIS)

<div class="compare">
<img src="/assets/img/projects/rend-a-pixel/mis_path_tracer/veach_bsdf.jpeg" alt="BSDF sampling">
<img src="/assets/img/projects/rend-a-pixel/mis_path_tracer/veach_nee.jpeg" alt="Next Event Estimation (NEE)">
<img src="/assets/img/projects/rend-a-pixel/mis_path_tracer/veach_mis.jpeg" alt="Multiple Importance Sampling (MIS)">
</div>

<p><em>Every single image rendered with 128spp. The further improvement on the noise is not because of having done 128spp (all three images were rendered with the same spp's), but because of the <span class="text-highlighted">Subtended-Cone Sampling</span>.</em></p>

## Summary of Features

<div class="two-column-section">
<div class="column">
<ul>
<li><span class="check">✓</span> Camera Models
<ul>
<li><span class="check">✓</span> Basic Perspective Camera</li>
<li><span class="check">✓</span> Thinlens Camera</li>
</ul>
</li>
<li><span class="check">✓</span> Basic Primitives
<ul>
<li><span class="check">✓</span> Sphere</li>
<li><span class="check">✓</span> Rectangles</li>
<li><span class="check">✓</span> Triangle/Generic Meshes</li>
</ul>
</li>
<li><span class="check">✓</span> Integrators
<ul>
<li><span class="check">✓</span> Albedo</li>
<li><span class="check">✓</span> Normals</li>
<li><span class="check">✓</span> Direct Lighting</li>
<li><span class="check">✓</span> Path Tracing</li>
</ul>
</li>
<li><span class="check">✓</span> BSDFs &amp; Lighting Models:
<ul>
<li><span class="check">✓</span> Materials:
<ul>
<li><span class="check">✓</span> Diffuse</li>
<li><span class="check">✓</span> Conductor</li>
<li><span class="check">✓</span> Rough Conductor</li>
<li><span class="check">✓</span> Dielectric</li>
<li><span class="check">✓</span> Principled</li>
</ul>
</li>
<li><span class="check">✓</span> Lambertian Emission</li>
</ul>
</li>
<li><span class="check">✓</span> Textures:
<ul>
<li><span class="check">✓</span> Checkerboard Texture</li>
<li><span class="check">✓</span> Image Texture</li>
</ul>
</li>
</ul>
</div>
<div class="column">
<ul>
<li><span class="check">✓</span> Lights:
<ul>
<li><span class="check">✓</span> Environment Map</li>
<li><span class="check">✓</span> Area Lights
<ul>
<li><span class="check">✓</span> Uniform Sphere Sampling</li>
<li><span class="check">✓</span> Cosine-Weighted Sampling</li>
<li><span class="check">✓</span> Subtended-Cone Sampling</li>
</ul>
</li>
<li><span class="check">✓</span> Point Light</li>
<li><span class="check">✓</span> Directional Light</li>
</ul>
</li>
<li><span class="check">✓</span> Sampling:
<ul>
<li><span class="check">✓</span> BSDF Sampling</li>
<li><span class="check">✓</span> Next Event Estimation (NEE)</li>
<li><span class="check">✓</span> Multiple Importance Sampling (MIS)</li>
</ul>
</li>
<li><span class="check">✓</span> Image denoising using <a href="https://www.openimagedenoise.org/">Intel&reg; Open Image Denoise</a></li>
<li><span class="check">✓</span> Acceleration Structures:
<ul>
<li><span class="check">✓</span> SAH Bounding Volume Hierarchy</li>
</ul>
</li>
<li><span class="check">✓</span> Shading Normals</li>
<li><span class="check">✓</span> Alpha Masking</li>
<li><span class="check">✓</span> Custom Bokeh Shapes</li>
</ul>
</div>
</div>

## Copyright & Credits

&copy; The Lightwave Framework was written by [Alexander Rath](https://graphics.cg.uni-saarland.de/people/rath.html), with contributions from [Ömercan Yazici](https://graphics.cg.uni-saarland.de/people/yazici.html) and [Philippe Weier](https://graphics.cg.uni-saarland.de/people/weier.html). Their support was invaluable in the coding of these features. The scenes showcasing the features were provided by their team, and should be used under permission. Many textures and models were taken from [Poly Haven](https://polyhaven.com)'s extensive library. Many thanks to the team behind [Tev](https://github.com/Tom94/tev) used extensively throughout this project as an EXR viewer.

_For more details, please refer to the project's [GitHub repository](https://github.com/CamiloMartinezM/rend-a-pixel)._

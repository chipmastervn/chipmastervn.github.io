---
layout: page
title: Danh Mục Bài Viết
---
<section class="section">
  <div class="container">
  <h3 class="title-color-2 font-tertiary">Mục Lục</h3>
    {% for tag in site.tags %}
      <div class="row">
        <a href="#{{ tag[0] | slugify }}" class="post-tag">{{ tag[0] }}</a>
      </div>
    {% endfor %}
  <hr/>
    {% for tag in site.tags %}
    <h4 class="tags-title-posts" id="{{ tag[0] | slugify }}">{{ tag[0] }}</h4>
    <ul class="tags-expo-posts">
      {% for post in tag[1] %}
      <!-- <li> -->
      <div>
        <span style="float: left;">
          <a class="btn-primary btn-transparent" href="{{ post.url }}">{{ post.title }}</a>
        </span>
        <span style="float: right;">
          {{ post.date | date_to_string }}
        </span>
      </div>
        <br>
      <!-- </li> -->
      <!-- </a> -->
      {% endfor %}
    </ul>
    {% endfor %}
  </div>
</section>
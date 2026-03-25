---
layout: page
title: "Python Design Patterns"
permalink: /python-design-patterns
description: "Học Design Patterns trong Python từ cơ bản đến nâng cao — từ OOP, SOLID Principles đến 7 Design Patterns phổ biến nhất."
---

<div class="docs-index">

  <!-- Hero -->
  <div class="docs-index-hero mb-5">
    <div class="d-flex align-items-center mb-3">
      <span style="font-size:3rem; margin-right:1rem;">🐍</span>
      <div>
        <h1 class="docs-index-title mb-1">Python Design Patterns</h1>
        <p class="text-muted mb-0">Từ OOP cơ bản đến 7 Design Patterns quan trọng nhất</p>
      </div>
    </div>
    <p class="lead">
      Chuỗi tài liệu học <strong>Design Patterns trong Python</strong> — được xây dựng theo cấu trúc chương, bám sát kiến trúc phần mềm thực tế. Phù hợp cho lập trình viên muốn viết code sạch, dễ bảo trì và có thể mở rộng.
    </p>
    <a href="/python-design-pattern-part-1" class="btn btn-danger btn-lg mr-2">
      <i class="fas fa-play-circle"></i> Bắt đầu học
    </a>
    <a href="#chapters" class="btn btn-outline-secondary btn-lg">
      <i class="fas fa-list"></i> Xem tất cả chương
    </a>
  </div>

  <!-- Chapter grid -->
  <h2 class="spanborder" id="chapters"><span>Các chương học</span></h2>

  <div class="row">
  {% assign nav = site.data.python_dp_nav %}
  {% for chapter in nav %}
  <div class="col-md-6 col-lg-4 mb-4">
    <div class="card h-100 shadow-sm docs-chapter-card">
      <div class="card-body">
        <div class="docs-chapter-num text-danger font-weight-bold mb-2">Chương {{ chapter.chapter }}</div>
        <h5 class="card-title font-weight-bold">{{ chapter.title }}</h5>
        <p class="text-muted small mb-3">{{ chapter.pages | size }} bài học</p>
        <ul class="list-unstyled mb-3">
          {% for p in chapter.pages limit: 3 %}
          <li class="mb-1">
            <a href="{{ site.baseurl }}{{ p.url }}" class="text-dark small">
              <i class="fas fa-angle-right text-danger mr-1"></i>{{ p.title | truncate: 55 }}
            </a>
          </li>
          {% endfor %}
          {% if chapter.pages.size > 3 %}
          <li class="small text-muted pl-3">+{{ chapter.pages.size | minus: 3 }} bài khác...</li>
          {% endif %}
        </ul>
        <a href="{{ site.baseurl }}{{ chapter.pages[0].url }}" class="btn btn-outline-danger btn-sm">
          Học ngay <i class="fas fa-arrow-right ml-1"></i>
        </a>
      </div>
    </div>
  </div>
  {% endfor %}
  </div>

  <!-- Full listing -->
  <h2 class="spanborder mt-5" id="all-lessons"><span>Toàn bộ bài học</span></h2>
  {% for chapter in nav %}
  <div class="docs-index-chapter mb-4">
    <h4 class="font-weight-bold">
      <span class="badge badge-danger mr-2">{{ chapter.chapter }}</span>{{ chapter.title }}
    </h4>
    <div class="list-group list-group-flush">
      {% for p in chapter.pages %}
      <a href="{{ site.baseurl }}{{ p.url }}" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-2">
        <span>
          <span class="text-muted small mr-2">#{{ p.part }}</span>{{ p.title }}
        </span>
        <i class="fas fa-chevron-right text-muted small"></i>
      </a>
      {% endfor %}
    </div>
  </div>
  {% endfor %}

</div>

<style>
.docs-index-hero { background: linear-gradient(135deg, #fff5f3 0%, #fff 100%); border-left: 4px solid var(--color-primary); padding: 2rem; border-radius: 0 8px 8px 0; }
.docs-chapter-card { border-top: 3px solid var(--color-primary); transition: var(--transition-fast); }
.docs-chapter-card:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(0,0,0,.12) !important; }
.docs-chapter-num { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; }
</style>

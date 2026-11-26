---
layout: default
permalink: /team/
kicker: "Annex"
title: "The newsroom"
lead: "Five students of the Applied Data Analysis course at EPFL, fall 2026, behind the coverage."
breaking: "Meet the team behind the coverage"
---

<div class="team">
  {% for member in site.data.team %}
  {% assign parts = member.name | split: " " %}
  {% assign ini1 = parts | first | slice: 0 %}
  {% assign ini2 = parts | last | slice: 0 %}
  <div class="member">
    <span class="avatar" aria-hidden="true">{{ ini1 }}{{ ini2 }}</span>
    <p class="member-name">{{ member.name }}</p>
    <p class="member-role">{% if member.role and member.role != "" %}{{ member.role }}{% else %}Contribution to fill in <code>_data/team.yml</code>{% endif %}</p>
  </div>
  {% endfor %}
</div>

<p class="prose">Code and notebook: <a href="https://github.com/UgoWX23/breaking-financial-virus">GitHub repository</a>.</p>

---
layout: page
tag: News Conferences
title: Post Index by categories
---

## News
<a id="News" class="anchor"></a> 

<ul class="contact-list">
{% for post in site.categories["News"] %}
  <li class="contact-list-item">

     <a href="{{ post.url }}">{{ post.title | escape }} </a>
     ({% assign d = post.date | date: "%-d" %}{% assign m = post.date | date: "%B" %}{% case m %}{% when 'April' or 'May' or 'June' or 'July' %}{{ m }}{% when 'September' %}Sept.{% else %}{{ post.date | date: "%b" }}.{% endcase %} {% case d %} {% when '1' or '21' or '31' %}{{ d }}st {% when '2' or '22' %}{{ d }}nd {% when '3' or '23' %}{{ d }}rd {% else %}{{ d }}th {% endcase %}, {{ post.date | date: "%Y" }})
  </li>
{% endfor %}
</ul>


## Blog posts
<a id="Blog" class="anchor"></a> 

<ul class="contact-list">
{% for post in site.categories["Blog"] %}
  <li class="contact-list-item">

     <a href="{{ post.url }}">{{ post.title | escape }} </a>
     ({% assign d = post.date | date: "%-d" %}{% assign m = post.date | date: "%B" %}{% case m %}{% when 'April' or 'May' or 'June' or 'July' %}{{ m }}{% when 'September' %}Sept.{% else %}{{ post.date | date: "%b" }}.{% endcase %} {% case d %} {% when '1' or '21' or '31' %}{{ d }}st {% when '2' or '22' %}{{ d }}nd {% when '3' or '23' %}{{ d }}rd {% else %}{{ d }}th {% endcase %}, {{ post.date | date: "%Y" }})
  </li>
{% endfor %}
</ul>

## Conferences
<a id="Conferences" class="anchor"></a> 

<ul class="contact-list">
{% for post in site.categories["Conferences"] %}
  <li class="contact-list-item">

     <a href="{{ post.url }}">{{ post.title | escape }} </a>
     ({% assign d = post.date | date: "%-d" %}{% assign m = post.date | date: "%B" %}{% case m %}{% when 'April' or 'May' or 'June' or 'July' %}{{ m }}{% when 'September' %}Sept.{% else %}{{ post.date | date: "%b" }}.{% endcase %} {% case d %} {% when '1' or '21' or '31' %}{{ d }}st {% when '2' or '22' %}{{ d }}nd {% when '3' or '23' %}{{ d }}rd {% else %}{{ d }}th {% endcase %}, {{ post.date | date: "%Y" }})
  </li>
{% endfor %}
</ul>


## Publications
<a id="Publications" class="anchor"></a> 

<ul class="contact-list">
{% for post in site.categories["Publications"] %}
  <li class="contact-list-item">

     <a href="{{ post.url }}">{{ post.title | escape }} </a>
     ({% assign d = post.date | date: "%-d" %}{% assign m = post.date | date: "%B" %}{% case m %}{% when 'April' or 'May' or 'June' or 'July' %}{{ m }}{% when 'September' %}Sept.{% else %}{{ post.date | date: "%b" }}.{% endcase %} {% case d %} {% when '1' or '21' or '31' %}{{ d }}st {% when '2' or '22' %}{{ d }}nd {% when '3' or '23' %}{{ d }}rd {% else %}{{ d }}th {% endcase %}, {{ post.date | date: "%Y" }})
  </li>
{% endfor %}
</ul>

## Miscellaneous
<a id="Miscellaneous" class="anchor"></a> 

<ul class="contact-list">
{% for post in site.categories["Miscellaneous"] %}
  <li class="contact-list-item">

     <a href="{{ post.url }}">{{ post.title | escape }} </a>
     ({% assign d = post.date | date: "%-d" %}{% assign m = post.date | date: "%B" %}{% case m %}{% when 'April' or 'May' or 'June' or 'July' %}{{ m }}{% when 'September' %}Sept.{% else %}{{ post.date | date: "%b" }}.{% endcase %} {% case d %} {% when '1' or '21' or '31' %}{{ d }}st {% when '2' or '22' %}{{ d }}nd {% when '3' or '23' %}{{ d }}rd {% else %}{{ d }}th {% endcase %}, {{ post.date | date: "%Y" }})
  </li>
{% endfor %}
</ul>

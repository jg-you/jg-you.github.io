{% extends "base-page.tpl" %}
{% block CONTENT %}
    {% for item in POSTS %} 
        {{ item }}
    {% endfor %}

    {% include "page-enum.tpl" %}
{% endblock %}
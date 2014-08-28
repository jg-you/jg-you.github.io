{% extends "base-page.tpl" %}
{% block CONTENT %}
    <h3>{{ TITLE }}</h3>
    <p class="postinfo">
        Posted on {{ DATE }}. 
        {%- if TAGS is defined %} 
        [
        {% for item in TAGS -%}
            <a href="tags/{{ item }}.html">{{ item }}</a>{%if loop.last%}{% else %}, {% endif %}
        {% endfor -%}
        ]
        {%- endif %}
    </p>
    <div class="regularContent">
    {{ PREVIEW_TEXT }}
    {{ FULL_TEXT }}
    {% if PREVIOUS_URL is defined %}<a href="{{ PREVIOUS_URL }}" class="previous">Previous</a>{% endif %}
    {% if NEXT_URL is defined %}<a href="{{ NEXT_URL }}" class="next">Next</a>{% endif %}
    </div>
{% endblock %}

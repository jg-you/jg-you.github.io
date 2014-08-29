{% extends "base-page.tpl" %}
{% block CONTENT %}
    {% for item in POSTS %} 
        {{ item }}
    {% endofor %}
    {% if PREVIOUS_URL is defined %}<a href="{{ PREVIOUS_URL }}" class="previous">Previous</a>{% endif %}
    {% if NEXT_URL is defined %}<a href="{{ NEXT_URL }}" class="bext">Next</a>{% endif %}
{% endblock %}
{% extends "base-page.tpl" %}
{% block CONTENT %}
    <h3>Post Archive</h3>
    <ul>
    {% for item in POSTS %} 
        <li>   {{ item }}  </li>
    {% endfor %}
    </ul>
{% endblock %}
{% for item in ENUM_URL_LIST %}
    {% if loop.index == HIGHLIGHT_INDEX %}
        <a href="{{ item.href }}" class="enum highlight">{{ item.caption }}</a>
    {% else %}
        <a href="{{ item.href }}" class="enum">{{ item.caption }}</a>
    {% endif %}
{% endfor %}

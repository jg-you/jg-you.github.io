<div class='recentPost'>
    <h3><a href="posts/pages/{{ URL }}.html">{{ TITLE }}</a></h3>
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
    </div>
</div>
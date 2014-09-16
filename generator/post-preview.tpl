<div class='recentPost'>
    <h3><a href="{{ PATH_TO_POST_DIRECTORY }}{{ URL }}">{{ TITLE }}</a></h3>
    <p class="postinfo">
        Posted on {{ DATE }}. 
        {%- if TAGS is defined %} 
        [
        {% for item in TAGS -%}
            <a href="{{ item.href }}">{{ item.caption }}</a>{%if loop.last%}{% else %}, {% endif %}
        {% endfor -%}
        ]
        {%- endif %}
    </p>
    <div class="regularContent">
    {{ PREVIEW_TEXT }}
    </div>
</div>
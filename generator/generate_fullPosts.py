import json
from jinja2 import Environment, FileSystemLoader

# Load general settings
settingsJson = json.load(open('settings.json'))
postsPerPage = settingsJson["posts_per_page"]
defaultKeywords = settingsJson["default_keywords"]

# Templating: prepare environment and load template
templateLoader = FileSystemLoader(searchpath = "./") 
env = Environment( loader = templateLoader )
fullPostTemplatePath = "full-post.tpl"
fullPostTemplate = env.get_template( fullPostTemplatePath )

# Load blog posts database
database = json.load(open('database/db.json'))

# Read content and produce posts pages
for postId in range(0,len(database["posts"])) :
    post = database["posts"][postId]
    templateVariables = post
    templateVariables["DEFAULT_KEYWORDS"] = defaultKeywords
    templateVariables["PATH_TO_BASE"] = "../"
    # URL management 
    templateVariables["URL"] = str(postId)+".html"
    if postId > 0 :
        templateVariables["PREVIOUS_URL"] = str(postId-1)+".html"
    if postId < len(database["posts"]) - 1 :
        templateVariables["NEXT_URL"] = str(postId+1)+".html"
    # Omission of the following fields raise an exception
    if "TITLE" not in post :
        raise("Untitled post (id="+str(postId)+")")
    if "DATE" not in post :
        raise("Undated post (id="+str(postId)+")")
    if "PREVIEW_TEXT" not in post :
        raise("No preview for post id="+str(postId))

    # Omission of the following fields cause defaulted behavior
    if "TAGS" in post :
        templateVariables["SPECIAL_KEYWORDS"] = post["TAGS"]

    htmlOutput = fullPostTemplate.render(templateVariables)
    fid = open("../posts/"+templateVariables["URL"],"w")
    fid.write(htmlOutput.encode('utf8'))
    fid.close()
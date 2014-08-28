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
    templateVariables = dict()
    templateVariables["DEFAULT_KEYWORDS"] = defaultKeywords
    templateVariables["PATH_TO_BASE"] = "../"
    # URL management 
    templateVariables["URL"] = str(postId)+".html"
    if postId > 0 :
        templateVariables["PREVIOUS_URL"] = str(postId-1)+".html"
    if postId < len(database["posts"]) - 1 :
        templateVariables["NEXT_URL"] = str(postId+1)+".html"
    # Omission of the following fields raise an exception
    if "title" in post :
        templateVariables["TITLE"] = post["title"]
    else :
        raise("Untitled post (id="+str(postId)+")")
    if "date" in post :
        templateVariables["DATE"] = post["date"]
    else :
        raise("Undated post (id="+str(postId)+")")
    if "preview_text" in post :
        templateVariables["PREVIEW_TEXT"] = post["preview_text"]
    else :
        raise("No preview for post id="+str(postId))

    # Omission of the following fields cause defaulted behavior
    if "tags" in post :
        templateVariables["TAGS"] = post["tags"]
        templateVariables["SPECIAL_KEYWORDS"] = post["tags"]
    if "full_text" in post :
        templateVariables["FULL_TEXT"]  = post["full_text"]
    else :
        templateVariables["FULL_TEXT"] = ""
    if "special_share_img" in post :
        templateVariables["SPECIAL_SHARE_IMAGE_URL"] = post["special_share_img"]

    htmlOutput = fullPostTemplate.render(templateVariables)
    fid = open("../posts/"+templateVariables["URL"],"w")
    fid.write(htmlOutput.encode('utf8'))
    fid.close()
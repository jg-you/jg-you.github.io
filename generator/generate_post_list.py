import json
from jinja2 import Environment, FileSystemLoader

# Load general settings
settingsJson = json.load(open('settings.json'))

# Templating: prepare environment and load template
templateLoader = FileSystemLoader(searchpath = "./") 
env = Environment( loader = templateLoader )
postListTemplatePath = "post-list.tpl"
postItemTemplatePath = "post-item.tpl"
postListTemplate = env.get_template( postListTemplatePath )
postItemTemplate = env.get_template( postItemTemplatePath )

# Load blog posts database
database = json.load(open('database/db.json'))

# Read content and produce posts items
postList = dict()
postList["DEFAULT_KEYWORDS"] = settingsJson["DEFAULT_KEYWORDS"]
postList["SPECIAL_KEYWORDS"] = ["post archive"]
postList["POSTS"] = []

for postId in reversed(range(0,len(database["posts"]))) :
    post = database["posts"][postId]
    if post["published"] :
        post["URL"] = "archive/posts/"+str(postId)+".html"
        postList["POSTS"].append(postItemTemplate.render(post))

# Replace template values in archive page
htmlOutput = postListTemplate.render(postList)
    
# Output html file
fid = open("../archive.html","w")
fid.write(htmlOutput.encode('utf8'))
fid.close()

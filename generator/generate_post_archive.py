from __future__ import division
import json
import itertools
from jinja2 import Environment, FileSystemLoader
from math import ceil
from urlenumitem import UrlEnumItem

# Load general settings
settingsJson = json.load(open('settings.json'))

# Templating: prepare environment and load template
templateLoader = FileSystemLoader(searchpath = "./") 
env = Environment( loader = templateLoader )
previewTemplatePath  = "post-preview.tpl"
archiveTemplatePath  = "post-archive.tpl"
pageEnumTemplatePath = "page-enum.tpl"
previewTemplate  = env.get_template( previewTemplatePath )
archiveTemplate  = env.get_template( archiveTemplatePath )
pageEnumTemplate = env.get_template( pageEnumTemplatePath )

# Load blog posts database
database = json.load(open('database/db.json'))

# Precompute the archive enumeration limit lists
postsPerPage = settingsJson["posts_per_page"]
archiveEnumLenght = settingsJson["archive_enum_lenght"] 
totalNumberOfPosts = database["number_of_published_posts"]
totalNumberOfPages = int(ceil(totalNumberOfPosts/postsPerPage))


# Read content and produce posts pages
postPerPageCounter = 0
runningPostId = 0
# ~~~ index.html ~~~~~
renderedPreviews = []
keywords = dict()
keywords["DEFAULT_KEYWORDS"] = settingsJson["DEFAULT_KEYWORDS"]
for postId in reversed(range(0,len(database["posts"]))):
    post = database["posts"][postId]
    if postPerPageCounter == postsPerPage :
        runningPostId = postId
        break
    else :
        if post["published"] :
            # We assert that a published post pass all tests
            postPerPageCounter+=1
            # URL management 
            post["URL"] = str(postId)+".html"
            post["PATH_TO_BASE"] = "../../"
            # Keywords
            if "TAGS" in post :
                if "SPECIAL_KEYWORDS" in keywords :
                    keywords["SPECIAL_KEYWORDS"].extend(post["TAGS"])
                else :
                    keywords["SPECIAL_KEYWORDS"] = post["TAGS"]
        # Replace template values in the preview
        renderedPreviews.append(previewTemplate.render( post ))
# Generate the index.html
previews = dict()
paths = dict()
url_enum = dict()
previews["POSTS"] = renderedPreviews
paths["PATH_TO_BASE"] = ""
paths["PATH_TO_ARCHIVE"] = "archive/"
url_enum["HIGHLIGHT_INDEX"] = 1 
url_enum["ENUM_URL_LIST"] = [ UrlEnumItem(str(idx)+".html",str(idx)) for idx in range (2,min(settingsJson["archive_enum_lenght"],totalNumberOfPages)+1) ]
url_enum["ENUM_URL_LIST"].insert(0,UrlEnumItem("index.html","1"))

htmlOutput = archiveTemplate.render(dict(previews.items()+keywords.items()+url_enum.items()+paths.items()))
# Output html file
fid = open("../index.html","w")
fid.write(htmlOutput.encode('utf8'))
fid.close()

# # ~~~ archives ~~~~~
# for pageID in range(2,totalNumberOfPages+1) :
#     url_enum["HIGHLIGHT_INDEX"] = pageID 
#     if url_enum["LONG_ENUM"] == True :

#     renderedPreviews = [] light
#     keywords = dict()
#     keywords["DEFAULT_KEYWORDS"] = settingsJson["DEFAULT_KEYWORDS"]
#     postPerPageCounter = 0
#     for postId in reversed(range(0,runningPostId)):
#         post = database["posts"][postId]
#         if postPerPageCounter == postsPerPage :
#             runningPostId = postId
#             break
#         else :
#             if post["published"] :
#                 # We assert that a published post pass all tests
#                 postPerPageCounter+=1
#                 # URL management 
#                 post["URL"] = str(postId)+".html"
#                 post["PATH_TO_BASE"] = "../../"
#                 # Keywords
#                 if "TAGS" in post :
#                     if "SPECIAL_KEYWORDS" in keywords :
#                         keywords["SPECIAL_KEYWORDS"].extend(post["TAGS"])
#                     else :
#                         keywords["SPECIAL_KEYWORDS"] = post["TAGS"]
#             # Replace template values in the preview
#             renderedPreviews.append(previewTemplate.render( post ))
#     # Generate the page.html
#     previews=dict()
#     previews["POSTS"] = renderedPreviews
#     paths = dict()
#     paths["PATH_TO_BASE"] = "../"
#     paths["PATH_TO_ARCHIVE"] = ""
#     htmlOutput = archiveTemplate.render(dict(previews.items()+keywords.items()+url_enum.items()+paths.item()))
#     htmlOutput = archiveTemplate.render(dict(previews.items()+keywords.items()+url_enum.items()))
#     # Output html file
#     fid = open("../archive/"+str(pageID)+".html","w")
#     fid.write(htmlOutput.encode('utf8'))
#     fid.close()
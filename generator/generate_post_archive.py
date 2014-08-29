import json
from jinja2 import Environment, FileSystemLoader

# Load general settings
settingsJson = json.load(open('settings.json'))
postsPerPage = settingsJson["posts_per_page"]

# Templating: prepare environment and load template
templateLoader = FileSystemLoader(searchpath = "./") 
env = Environment( loader = templateLoader )
previewTemplatePath = "post-preview.tpl"
archiveTemplatePath = "post-archive.tpl"
previewTemplate = env.get_template( previewTemplatePath )
archiveTemplate = env.get_template( archiveTemplatePath )

# Load blog posts database
database = json.load(open('database/db.json'))

# Read content and produce posts pages
totalNumberOfPosts = database["number_of_generated_posts"]

# Generate index 

# TODO (templates are done)

# Generate the rest

#  TODO (templates are done)

# Tags page should be done at the same time
# for postId in reversed(range(0,len(database["posts"]))):
#     post = database["posts"][postId]
#     while post["generated"] and postId < len :
#         # We assert that a generated post pass all tests

#         # If all tests are passed, we produce a set of fitting pahts
#         paths = dict()
#         paths["PATH_TO_BASE"] = "../"
#         # URL management 
#         paths["URL"] = str(postId)+".html"
#         if postId > 0 :
#             paths["PREVIOUS_URL"] = str(postId-1)+".html"
#         if postId < len(database["posts"]) - 1 :
#             paths["NEXT_URL"] = str(postId+1)+".html"

#         # Keywords
#         keywords = dict()
#         keywords["DEFAULT_KEYWORDS"] = settingsJson["DEFAULT_KEYWORDS"]
#         if "TAGS" in post :
#             keywords["SPECIAL_KEYWORDS"] = post["TAGS"]

#         # Replace template values
#         htmlOutput = fullPostTemplate.render(dict(keywords.items()+paths.items()+post.items()))
        
#         # Output html file
#         fid = open("../posts/"+paths["URL"],"w")
#         fid.write(htmlOutput.encode('utf8'))
#         fid.close()

#         # Update databse
#         database["posts"][postId]["generated"] = True

# # update database
# with open('database/db.json', 'w') as fid :
#     json.dump(database, fid, indent = 4, sort_keys = True)
# fid.close()

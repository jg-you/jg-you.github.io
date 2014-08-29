import json
import argparse
from jinja2 import Environment, FileSystemLoader

# Program options
parser = argparse.ArgumentParser(description='Generate complete post pages (full text), with proper tagging and prev/next buttons.')
parser.add_argument('--eval', action='count', help='Produce every post anew instead of only generating new post pages (possible usage: after a template update).')
args = parser.parse_args()

# Load general settings
settingsJson = json.load(open('settings.json'))

# Templating: prepare environment and load template
templateLoader = FileSystemLoader(searchpath = "./") 
env = Environment( loader = templateLoader )
fullPostTemplatePath = "post-full.tpl"
fullPostTemplate = env.get_template( fullPostTemplatePath )

# Load blog posts database
database = json.load(open('database/db.json'))

# Read content and produce posts pages
totalNumberOfGeneratedPosts = 0;
for postId in range(0,len(database["posts"])) :
    post = database["posts"][postId]
    if not post["generated"] or args.eval > 0 :
        # Omission of the following fields raise an exception
        if "TITLE" not in post :
            raise("Untitled post")
        if "DATE" not in post :
            raise("Undated post")
        if "PREVIEW_TEXT" not in post :
            raise("No preview")

        # If all tests are passed, we produce a set of fitting pahts
        paths = dict()
        paths["PATH_TO_BASE"] = "../"
        # URL management 
        paths["URL"] = str(postId)+".html"
        if postId > 0 :
            paths["PREVIOUS_URL"] = str(postId-1)+".html"
        if postId < len(database["posts"]) - 1 :
            paths["NEXT_URL"] = str(postId+1)+".html"

        # Keywords
        keywords = dict()
        keywords["DEFAULT_KEYWORDS"] = settingsJson["DEFAULT_KEYWORDS"]
        if "TAGS" in post :
            keywords["SPECIAL_KEYWORDS"] = post["TAGS"]

        # Replace template values
        htmlOutput = fullPostTemplate.render(dict(keywords.items()+paths.items()+post.items()))
        
        # Output html file
        fid = open("../posts/"+paths["URL"],"w")
        fid.write(htmlOutput.encode('utf8'))
        fid.close()

        # Update databse
        database["posts"][postId]["generated"] = True
        totalNumberOfGeneratedPosts += 1

# update database
database["number_of_generated_posts"] = totalNumberOfGeneratedPosts
with open('database/db.json', 'w') as fid :
    json.dump(database, fid, indent = 4, sort_keys = True)
fid.close()

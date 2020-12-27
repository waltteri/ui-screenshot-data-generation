# ScrapeAndPickleURL.py - A script that scrapes the provided URL 
# Command line arguments:
#   --url:      The URL to be scraped, including the protocol prefix (e.g. https://)
#   --output:   Relative path to the file in which the results should be saved. Filetype is .pkl.

# All imports go here:
import threading
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
import pandas
import math
import time
from io import BytesIO
import urllib.robotparser
import os
import signal
import requests
import random
from PIL import ImageDraw, Image, ImageFont
import logging
import pickle
import re
import psutil
import argparse


# Options for the Firefox WebDriver
options = Options()
options.headless = True

# Constants
MAXIMUM_LABEL_AREA = 0.3


# ARGUMENTS #######################################################################################

# Define the ArgumentParser
parser = argparse.ArgumentParser(description="ScrapeAndPickleURL.py opens the given URL in a headless Firefox browser, takes a screenshot, parses the DOM structure of the page, and saves everything in one neat Python Pickle (.pkl) file.")
parser.add_argument("--url", help="Full URL of the web page to be scraped.")
parser.add_argument("--output", help="Path where the new Pickle (.pkl) will be saved.")
parser.add_argument("--annotationImagePath", help="Path where a Yillow-annotated visualization of the scraping will be saved.")
parser.add_argument("--scaleToWidth", type=int, help="Width to scale the image to, preserving scale. Default is 1920.", default=1920)
args = parser.parse_args()

# Check arguments
if args.url is None:
    raise Exception("Please provide an URL with the --url argument.")
if args.output is None:
    raise Exception("Plase provide a path for the output .pkl file with the --output argument.")





# SCRAPING FUNCTION DEFINITIONS ###################################################################


# Data Structure
# 
# List of following items:
# 
# DOM_Element_Data
#  - tag_name (string)
#  - position (dict)
#  - size (dict)
#  - box (tuple)
#  - is_displayed (bool)
#  - text_content (string)
#  - children[] (list of DOM_Element_Data)


# getFullPageScreenshot - Returns a PIL image of the requested web page,
#                 with the whole of the website being stitched to one picture
def getFullPageScreenshot(browser):
    
    # Take the screenshot
    screenshot_bytes = browser.get_screenshot_as_png()
    screenshot = Image.open(BytesIO(screenshot_bytes))
    return screenshot

# openPageSizeToFit - Points the browser to a URL and changes the browser window size
def openPageSizeToFit(browser, url, browser_width=1920, browser_height=1080, resize_wait_time=5):
    
    # Set the window size and open the url
    browser.set_window_size(browser_width, browser_height)
    browser.get(url)
    
    time.sleep(resize_wait_time)
    
    # Get the dimensions of the website
    html_elem = browser.find_element_by_tag_name("html")
    html_width = html_elem.size['width']
    html_height = html_elem.size['height']
    
    # Set the screen height to match the dimensions of the content
    if html_height>browser_height:
        browser.set_window_size(browser_width, html_height)
        time.sleep(resize_wait_time)

# scrapeDom(browser, url) - Returns the DOM tree from the page in the URL.

def scrapeDom(browser, scale_factor=1):
    
    # Get all elements within the body
    body = browser.find_element_by_tag_name("body")
    
    # Return the DOM tree.
    return scrapeDomChildren(body, scale_factor)
    

def scrapeDomChildren(element, scale_factor=1):
    
    # Initialize the list of children
    children = []
    
    # Iterate through the children of the element and add them to the list
    for child in element.find_elements_by_xpath("*"):
        try:
            child_dict = scrapeDomChildren(child, scale_factor)
            children.append(child_dict)
        except:
            pass
    
    # Return the results
    return {
        "tag_name": element.tag_name,
        "location": {
            "x": element.location["x"] * scale_factor,
            "y": element.location["y"] * scale_factor
        },
        "size": {
            "width": element.size["width"] * scale_factor,
            "height": element.size["height"] * scale_factor
        },
        "box": (
            int(element.location["x"] * scale_factor),
            int(element.location["y"] * scale_factor),
            int( (element.location["x"] + element.size["width"]) * scale_factor ),
            int( (element.location["y"] + element.size["height"]) * scale_factor )
        ),
        "type": element.get_attribute("type"),
        "is_displayed": element.is_displayed(),
        "href": element.get_attribute("href"),
        "src": element.get_attribute("src"),
        "alt": element.get_attribute("alt"),
        "cssClass": element.get_attribute("class"),
        "cssId": element.get_attribute("id"),
        "onClickEvent": element.get_attribute("onclick"),
        "text": element.text,
        "children": children
    }



# SCRAPING AND SAVING #############################################################################

# Open Firefox, scrape DOM, and take a screenshot.
print(f"{args.url}: Scraping...")
browser = webdriver.Firefox(options=options)

openPageSizeToFit(browser, args.url)

screenshot = getFullPageScreenshot(browser)
print(f"{args.url}: Screenshot taken!")

# Calculate new width/height for image
width = args.scaleToWidth
orig_width, orig_height = screenshot.size
scale_factor = width / orig_width
height = int(scale_factor * orig_height)
screenshot = screenshot.resize((width, height))


dom = scrapeDom(browser, scale_factor)
print(f"{args.url}: DOM parsed!")

browser.quit()


# Compile the result dictionary
result = {}
result['url'] = args.url
result['dom'] = dom
result['screenshot'] = screenshot

# Save the results
with open(args.output, 'wb') as f:
    pickle.dump(result, f)
    f.close()

print(f"{args.url}: Results saved to {args.output}!")

# Kill child processes
current_process = psutil.Process()
for process in current_process.children(recursive=True):
    process.kill()
print(f"{args.url}: Children terminated.")

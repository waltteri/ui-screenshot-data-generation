# IMPORTS  ########################################################################################
import subprocess
import argparse
import logging
from multiprocessing import Pool
import os

# ARGUMENTS  ######################################################################################
parser = argparse.ArgumentParser(description="Scrape all URLs from a CSV file and keep track of the progress.")
parser.add_argument("--url", help="Path to the generator file to scrape.")
parser.add_argument("--num", help="Number of instances to generate.")
parser.add_argument("--threads", help="Number of threads to run the process on.")
args = parser.parse_args()

# Handle generator URL arg
if args.url is None:
    args.url = "./GenerateSingle.html"

# Handle generation amount arg
if args.num is None:
    args.num = 100

# Handle thread num arg
if args.threads is None:
    args.threads = 8

# FUNCTION DEFINITIONS  ###########################################################################

# scrapeURL - Starts a subprocess, which scrapes a URL and saves it to the defined location.
def scrapePath(idx):
    try:
        url = "file://"+os.path.join(os.getcwd(), args.url)
        logging.info(f"Scraping local path {url}")
        pkl_path = f"output/gen_{idx}.pkl"
        subprocess.call(["python", "ScrapeAndPickleLocalURL.py", "--url", url, "--output", pkl_path, "--scaleToWidth", "512"])
    except Exception as e:
        logging.error(f"Could not scrape website '{tld}'! Exception: {str(e)}")


# MULTITHREADING AND QUEUE MANAGEMENT  ############################################################

if __name__ == '__main__':
    
    # Generate the indices for the subprocesses
    indices = list(range(int(args.num)))
    
    # Start the pool
    pool = Pool(processes=int(args.threads))
    pool.map(scrapePath, indices)
    


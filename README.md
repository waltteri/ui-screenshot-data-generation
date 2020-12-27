# ui-screenshot-data-generation UI Screenshot Data Generation

## Generate data

You can generate data using the GenerateData.py Python script. By default, it opens the GenerateSingle.html file 100 times using 8 threads, and saves them to a the output/ folder.

Use 'python GenerateData.py --help' to see more information about the available arguments.



## Change the contents of the generation

By changing the file being opened (using --url argument on the script), or by changing the GenerateSingle.html file, you can alter the data being generated.


## Dependencies

Python 3.4, Firefox, and Mozilla Web Driver.

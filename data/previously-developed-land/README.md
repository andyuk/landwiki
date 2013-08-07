
## Data source:

http://www.homesandcommunities.co.uk/nlud-pdl-results-and-analysis.
http://www.homesandcommunities.co.uk/sites/default/files/our-work/NLUD2009SitesMV.zip

## Import

mongoimport --db landwiki --collection lands --type csv --headerline --file land.csv

## Clean

node clean.js

## Remove old records

{ "status": 0 }

## Export

mongoexport --db landwiki --collection lands --csv --fieldFile export-fields.txt --out land-export.csv


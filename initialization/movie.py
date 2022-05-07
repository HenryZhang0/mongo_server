
import pandas as pd 
import numpy as np 
import json
df1=pd.read_csv('credits.csv')
# df2=pd.read_csv('../input/tmdb-movie-metadata/tmdb_5000_movies.csv')
df2 = pd.read_csv('movies_metadata.csv')
print(df1.head(10))

df1_dict = df1.to_dict('index')
'''
with open('credits.txt', 'w') as outfile:
    json.dump(df1_dict, outfile

    '''
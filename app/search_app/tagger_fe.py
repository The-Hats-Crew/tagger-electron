import nltk
nltk.download('punkt')
nltk.download('stopwords')

from nltk.tokenize import word_tokenize
import string
from nltk.corpus import stopwords
import sqlite3
import pandas as pd

def clean_search_string(term):
    # split into words
    tokens = word_tokenize(term)
    # convert to lower case
    tokens = [w.lower() for w in tokens]
    # remove punctuation from each word
    table = str.maketrans('', '', string.punctuation)
    stripped = [w.translate(table) for w in tokens]
    # remove remaining tokens that are not alphabetic
    words = [word for word in stripped if word.isalpha()]
    # filter out stop words
    stop_words = set(stopwords.words('english'))
    words = [w for w in words if not w in stop_words]
    return(words)

def return_term_df(term, path):
    '''takes a term and returns a dataframe of emails where that term is included'''

    query = f"SELECT DISTINCT message_id " + \
    f"FROM emails INNER JOIN tags ON emails.id = tags.email_id " + \
    f"WHERE tags.tag LIKE '%{term}%'"

    sql_connect = sqlite3.connect(path)
    cursor = sql_connect.cursor()

    results = cursor.execute(query).fetchall()
    output_df = pd.read_sql_query(query,sql_connect)
    sql_connect.close()
    return output_df

def return_combined_term_df(terms, path):
    '''takes a list of search terms and a path, returns emails'''
    column_names = ["message_id"]
    df = pd.DataFrame(columns = column_names)
    for term in terms:
      temp_df = return_term_df(term, path)
      df = df.append(temp_df)
    df = df.drop_duplicates()
    return df

def search(search_string, path):
    '''takes a search string returns a df with emails'''
    terms = clean_search_string(search_string)
    results_df = return_combined_term_df(terms, path)
    return results_df








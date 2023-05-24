import sys
import psycopg2
from BE.config import config


def connect(method: str = "none", post_list = {}):
    """ Connect to the PostgreSQL database server """
    conn = None
    try:
        # read connection parameters
        params = config()

        # connect to the SQL server
        sys.stdout.write('\033[94mDB_INFO:\033[0m  Connecting to the PostgreSQL database...\n')
        conn = psycopg2.connect(**params)

        # create a cursor
        cur = conn.cursor()

        # execute a statement
        sys.stdout.write('\033[94mDB_INFO:\033[0m  PostgreSQL database version:\n')
        cur.execute('SELECT version()')

        # display the PostgreSQL database server version
        db_version = cur.fetchone()
        sys.stdout.write(str(db_version))
        sys.stdout.write(" \033[92mConnection was 200\033[0m\n")

        if method == "get":
            cur.execute("Select * FROM quotes")
            records = cur.fetchall()
            for row in records:
                sys.stdout.write(str(row) + "\n")
                cur.close()
            return records
        elif method == "post":
            cur.execute("INSERT INTO quotes(name, quote) VALUES (%s, %s)",
                        (f'{post_list["name"]}: ', post_list["quote"]))
            sys.stdout.write(str(post_list["name"] + " " + post_list["quote"]))
            conn.commit()
            cur.close()
            return f"{post_list['name']} your quote was successfully inserted!"
        else:
            # close the communication with the PostgreSQL
            cur.close()
            return True

    except (Exception, psycopg2.DatabaseError) as error:
        sys.stdout.write(str(error))
        sys.stdout.write(" \033[91mConnection was 401\033[0m\n")
        return False

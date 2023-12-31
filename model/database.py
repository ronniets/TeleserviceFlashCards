import sqlite3
import os

cd = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(cd, 'card.db')

QUESTIONS = [('När grundades Teleservice?', '1973'),
             ('Vart ligger huvudkontoret?', 'I Sjöbo'),
             ('Vem har utvecklat detta spelet?', 'Praktikanten')]

class Database():
    ## Creates connection to the database and returns a conn object.
    def connect_to_db(self, file_path):
        try:
            return sqlite3.connect(file_path)
        except sqlite3.DatabaseError as e:
            return e
        
    ## Creates a table of questions.
    def create_table(self, conn):
        try:
            cursor = conn.cursor()

            create_statement = """CREATE TABLE IF NOT EXISTS Questions (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    Question varchar(255) NOT NULL,
                    Answer varchar(255) NOT NULL
                );"""
            
            cursor.execute(create_statement)
            conn.commit()

        except (sqlite3.OperationalError, sqlite3.InternalError) as e:
            return e
    
    ## Inserts the questions into the table of questions.
    def insert_questions(self, conn, questions):
        try:
            cursor = conn.cursor()

            insert_statement = "INSERT INTO Questions (Question, Answer) VALUES (?, ?);"
            for question, answer in questions:
                cursor.execute("SELECT * FROM Questions WHERE Question = ? AND Answer = ?", (question, answer,))
                existing_data = cursor.fetchone()

                if not existing_data:
                    cursor.execute(insert_statement, (question, answer))
                
            conn.commit()
        except (sqlite3.OperationalError, sqlite3.InternalError) as e:
            return e
    
    ##Fetches the questions so that they can be shown in the application.
    def select_table(self, conn):
        try:
            cursor = conn.cursor()
            select_statement = '''SELECT ID, Question, Answer FROM Questions'''
            cursor.execute(select_statement)
            return cursor.fetchall()
        
        except (sqlite3.OperationalError, sqlite3.InternalError) as e:
            return e

    ##Gets the questions and returns them as a list    
    def get_questions(self):
        try:
            conn = self.connect_to_db(file_path)
            self.create_table(conn)
            self.insert_questions(conn, QUESTIONS)
            return self.select_table(conn)
        
        except Exception as e:
            return e
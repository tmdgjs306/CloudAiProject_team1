import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv
load_dotenv()

RDS_HOST =os.getenv('RDS_HOST')
# RDS_PORT = os.getenv('RDS_PORT') # 3306 아닌 경우에만 활성화
RDS_USERNAME = os.getenv('RDS_USERNAME')
RDS_PASSWORD = os.getenv('RDS_PASSWORD')
RDS_DATABASE = os.getenv('RDS_DATABASE')


def create_connection():
    """Create a database connection to the MySQL database."""
    connection = None
    try:
        connection = mysql.connector.connect(
            host=RDS_HOST,
            # port=RDS_PORT, # 3306 아닌 경우에만 활성화
            user=RDS_USERNAME,
            password=RDS_PASSWORD,
            database=RDS_DATABASE
        )
        if connection.is_connected():
            print("Connection to MySQL DB successful")
    except Error as e:
        print(f"The error '{e}' occurred")
    return connection

# 메인 기능: 추론 후 견종 정보 반환
def get_dog_info_by_id(connection, dog_id):
    query = '''
            SELECT dog_code, dog_breed, dog_height_cm, dog_weight_kg, 
            dog_short_info, dog_info, dog_training, dog_friend 
            FROM dog WHERE dog_code = {dog_id}
            '''.format(dog_id = dog_id)
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        result = cursor.fetchall()
        print("Query executed successfully")
        cursor.close()
        return result
    except Error as e:
        print(f"The error '{e}' occurred")
    finally:
        cursor.close()

# 견종과 나이 -> 해당되는 생애 주기 반환 
def get_dog_lifecycle_stages_id_by_breed_age(connection, dog_id, age):
    query = '''
            SELECT dog_lifecycle_stages_code 
            FROM dog_lifecycle_info 
            WHERE dog_breed_code = %s 
            AND %s >= dog_lifecycle_stages_start_at 
            AND %s <= dog_lifecycle_stages_end_at
            '''
    cursor = connection.cursor()
    try:
        cursor.execute(query, (dog_id, age, age))
        result = cursor.fetchall()
        print("Query executed successfully")
        if result:
            dog_lifecycle_stages_id = result[0][0]
            return dog_lifecycle_stages_id
        else:
            return None
    except mysql.connector.Error as e:
        print(f"The error '{e}' occurred")
        return None
    finally:
        cursor.close()                                       

# 견종과 해당 생애 주기 -> 관련 정보 (건강, 추천 제품) 반환
def get_dog_info_by_breed_lifecycle_stage(connection, dog_id, dog_lifecycle_stages_id):
    query = '''
            SELECT dog_breed, dog_lifecycle_stages_title, health_info
            FROM dog_lifecycle_info_view
            WHERE dog_code = %s AND dog_lifecycle_stage_code = %s
            '''
    cursor = connection.cursor()
    try:
        cursor.execute(query, (dog_id, dog_lifecycle_stages_id))
        result = cursor.fetchall()
        print("Query executed successfully")
        # print(result)
        if result:
            (label, lifecycle_state, health_info_text) = result[0]
            health_info_list = health_info_text.strip().split('\n\n')
            health_info = []
            for item in health_info_list:
                lines = item.split('\n')
                item = {}
                for line in lines:
                    key, value = line.split(':')
                    item[key]=value
                health_info.append(item)
            result = [{"name" : label,
                    "lifecycle_state": lifecycle_state,
                    "health_info": health_info}]
            return result
        else:
            return None
    except mysql.connector.Error as e:
        print(f"The error '{e}' occurred")
        return None
    finally:
        cursor.close()
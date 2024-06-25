from flask import Flask, request, jsonify, g
from model import custom_load_model, get_labels
from image_processing import verify_image, preprocess_image
from predictions import filtered_predictions
from tensorflow.keras.applications.vgg16 import preprocess_input # type: ignore
from db import create_connection, get_dog_lifecycle_stages_id_by_breed_age, get_dog_info_by_breed_lifecycle_stage

app = Flask(__name__)

# 모델 Load
model = custom_load_model()
labels = get_labels()
preprocess_input = preprocess_input

@app.before_request
def before_request():
    g.connection = create_connection()

@app.after_request
def after_request(response):
    connection = getattr(g, 'connection', None)
    if connection:
        connection.close()
    print("Database connection closed")
    return response

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        image_url = data.get('image_url')
        img = verify_image(image_url)
        img_arr = preprocess_image(img) 
        pred = model.predict(img_arr)
        result = filtered_predictions(g.connection, pred)
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/health/<int:dog_id>/<int:dog_age>', methods=['GET'])
def get_health_info(dog_id, dog_age):
    try:
        dog_lifecycle_stages_id = get_dog_lifecycle_stages_id_by_breed_age(g.connection, dog_id, dog_age)
        health_info = get_dog_info_by_breed_lifecycle_stage(g.connection, dog_id, dog_lifecycle_stages_id)
        if health_info:
            return jsonify(health_info)
        else:
            return jsonify({"error": "No health information found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5500, debug=True)
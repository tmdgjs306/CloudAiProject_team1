from db import get_dog_info_by_id

# 라벨 형태 변경시 사용
# from model import get_labels
# labels = get_labels()

def filtered_predictions(connection, predictions, threshold = 0.01):
    predictions = predictions[0].tolist()
    formated_predictions = [{"id": id, "score": float(score)} for id, score in enumerate(predictions)]
    filtered_predictions = [pred for pred in formated_predictions if pred["score"] >= threshold]
    # result 기본 snippet
    result = {"results_number" : len(filtered_predictions)} # 섞인 종 갯수
    # result에 각 prediction 아이템 추가 
    for prediction_item in filtered_predictions:
        dog_id = prediction_item["id"]+1
        # formatting score
        score = round(prediction_item["score"]* 100, 0)  # 계산을 위해 숫자 형식으로 남김 (float)
        # get information by dog_id
        dog_data = get_dog_info_by_id(connection, dog_id)
        (dog_id, label, height, weight, description, general_info, training_info, friend_info) = dog_data[0]
        result[f"class_{dog_id}"] = [{"dog_id": dog_id,
                                      "name" : label,
                                      "value" : score,
                                      "height": height,
                                      "weight": weight,
                                      "description":description,
                                      "general_info": general_info,
                                      "training_info": training_info,
                                      "friend_info": friend_info}]
    return result
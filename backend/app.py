from flask import Flask, request, jsonify
import numpy as np
from src.pipelines.prediction_pipeline import CustomData, PredictPipeline
from flask_cors import CORS


application = Flask(__name__)
app = application
CORS(app)

def get_value(data_source, key, cast=None, required=True):
    val = data_source.get(key)
    if val is None and required:
        raise ValueError(f"Missing required field: {key}")
    if val is None:
        return None
    if cast:
        try:
            return cast(val)
        except Exception as e:
            raise ValueError(f"Invalid value for {key}: {val}. Error: {e}")
    return val

@app.route('/predict', methods=['POST'])
def predict_datapoint():
    try:
        data_json = request.get_json(silent=True)
        if data_json:
            src = data_json
        else:
            src = request.form.to_dict()

        age = get_value(src, 'age', cast=int)
        bmi = get_value(src, 'bmi', cast=float)
        children = get_value(src, 'children', cast=int)
        sex_raw = get_value(src, "sex", cast=str).strip().lower()
        if sex_raw in ["male", "m"]:
            sex = "male"
        elif sex_raw in ["female", "f"]:
            sex = "female"
        else:
            raise ValueError(f"Invalid sex value: {sex_raw}. Expected 'male' or 'female'.")

        smoker_raw = src.get('smoker', None)
        region = get_value(src, 'region', cast=str)

        if smoker_raw is None:
            smoker = "no"  
        elif isinstance(smoker_raw, bool):
            smoker = "yes" if smoker_raw else "no"
        elif isinstance(smoker_raw, str):
            smoker_lower = smoker_raw.strip().lower()
            if smoker_lower in ("true", "1", "yes", "y"):
                smoker = "yes"
            elif smoker_lower in ("false", "0", "no", "n"):
                smoker = "no"
            else:
                raise ValueError(f"Invalid smoker value: {smoker_raw}")
        else:
            smoker = "yes" if int(smoker_raw) == 1 else "no"


        region = region.strip().lower()

        data = CustomData(
            age=age,
            bmi=bmi,
            children=children,
            sex=sex,
            smoker=smoker,
            region=region
        )

        final_new_data = data.get_data_as_dataframe()
        predict_pipeline = PredictPipeline()
        pred = predict_pipeline.predict(final_new_data)
        results = round(pred[0]) if isinstance(pred, (list, np.ndarray)) else round(pred)

        
        return jsonify({"premium": results}), 200

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as ex:
        app.logger.exception("Prediction failed")
        return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd
from sklearn.metrics import classification_report
from sklearn.decomposition import PCA
import os

app = Flask(__name__)
CORS(app)

# --- Load everything from one pickle ---
with open(os.path.join('..', 'PKLs', 'rf model.pkl'), 'rb') as f:
    saved = pickle.load(f)

model = saved['model']
feature_encoders = saved['feature_encoders']
target_encoder = saved['target_encoder']
X_test = saved['X_test']
y_test = saved['y_test']

# Remove target column if accidentally included
feature_encoders.pop('Depression State', None)

# --- Predict on test set for reuse ---
y_pred = model.predict(X_test)

@app.route('/')
def index():
    return "Mental Health Predictor API"

@app.route('/label-options')
def get_label_options():
    options = {feature: list(encoder.classes_) for feature, encoder in feature_encoders.items()}
    return jsonify(options)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        print("📥 Incoming data:", data)

        input_data = {}
        for feature, encoder in feature_encoders.items():
            val = data.get(feature)
            if val is None:
                return jsonify({"error": f"Missing value for feature '{feature}'"}), 400
            if val not in encoder.classes_:
                return jsonify({"error": f"Invalid value '{val}' for feature '{feature}'"}), 400
            input_data[feature] = encoder.transform([val])[0]

        input_df = pd.DataFrame([input_data])
        print("✅ Encoded DataFrame:", input_df)

        diagnosis = model.predict(input_df)[0]
        confidence = model.predict_proba(input_df).max()

        predicted_label = target_encoder.inverse_transform([diagnosis])[0]

        return jsonify({
            "diagnosis": predicted_label,  # <-- change key to 'diagnosis'
            "confidence": round(float(confidence*99), 4)
        })

    except Exception as e:
        print("❌ Exception in /predict:", str(e))
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500

@app.route('/model-metrics')
def model_metrics():
    report = classification_report(y_test, y_pred, output_dict=True, zero_division=0)
    return jsonify({
        'accuracy': round(report.get('accuracy', 0), 4),
        'precision_macro': round(report.get('macro avg', {}).get('precision', 0), 4),
        'recall_macro': round(report.get('macro avg', {}).get('recall', 0), 4),
        'f1_macro': round(report.get('macro avg', {}).get('f1-score', 0), 4)
    })

@app.route('/visual-data')
def visual_data():
    # --- PCA cluster plot (you can remove this from frontend if unused) ---
    pca = PCA(n_components=2)
    components = pca.fit_transform(X_test)
    cluster_points = [
        {'x': float(x), 'y': float(y), 'label': int(label)}
        for (x, y), label in zip(components, y_test)
    ]

    # --- Feature importance ---
    importances = model.feature_importances_
    feature_importance = [
        {'feature': feature, 'importance': round(float(imp), 3)}
        for feature, imp in zip(X_test.columns, importances)
    ]

    # --- Class distribution ---
    labels, counts = np.unique(y_test, return_counts=True)
    class_distribution = [
        {'label': str(target_encoder.inverse_transform([label])[0]), 'count': int(count)}
        for label, count in zip(labels, counts)
    ]

    # --- Jittered Actual vs Predicted ---
    jitter = 0.1
    y_test_j = y_test + np.random.uniform(-jitter, jitter, size=len(y_test))
    y_pred_j = y_pred + np.random.uniform(-jitter, jitter, size=len(y_pred))
    jitter_data = [
        {'actual': float(a), 'predicted': float(p)}
        for a, p in zip(y_test_j, y_pred_j)
    ]

    return jsonify({
        'cluster_points': cluster_points,
        'feature_importance': feature_importance,
        'class_distribution': class_distribution,
        'jitter_data': jitter_data
    })

if __name__ == '__main__':
    app.run(debug=True)

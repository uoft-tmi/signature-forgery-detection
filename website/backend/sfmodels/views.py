from rest_framework.views import APIView
from rest_framework.response import Response
from .load_models import ModelLoader
import json
from .preprocessing import preprocess
import numpy as np


class PredictView(APIView):
    def post(self, request, *args, **kwargs):
        file = request.FILES['file']
        model_indices = json.loads(request.data['models'])
        
        reg_img, tree_img = preprocess(file)

        models = {}
        if 1 in model_indices:
            models['Decision Tree'] = ModelLoader.get_decision_tree()
        if 2 in model_indices:
            models['KNN'] = ModelLoader.get_knn()
            models['PCA'] = ModelLoader.get_pca()
        if 3 in model_indices:
            models['CNN'] = ModelLoader.get_cnn()
        
        predictions = {}
        for name in models:
            if name == "CNN":
                image = reg_img
            elif name == 'KNN':
                pca = models['PCA']  # Retrieve PCA for KNN
                image = image.reshape(image.shape[0], -1)  # Flatten if necessary
                image = pca.transform(image)  # Apply PCA transformation
            else:
                image = tree_img
            predictions[name] = models[name].predict(image)
        
        return Response({'predictions': predictions})

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from PIL import Image
import numpy as np
import io
from .load_models import ModelLoader
import json
from .preprocessing import preprocess


class PredictView(APIView):
    def post(self, request, *args, **kwargs):
        file = request.FILES['file']
        model_indices = json.loads(request.data['models'])
        
        reg_img, tree_img = preprocess(file)

        # TODO: only load the models the user wants
        decision_tree = ModelLoader.get_decision_tree()
        knn = ModelLoader.get_knn()
        cnn = ModelLoader.get_cnn()

        models = {'Decision Tree': decision_tree,
                  'KNN': knn,
                  'CNN': cnn}
        
        predictions = {}
        for name in models:
            if name == "CNN":
                image = reg_img
            else:
                image = tree_img
            predictions[name] = models[name].predict(image)
        
        return Response({'predictions': predictions})

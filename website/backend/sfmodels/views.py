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
        models = {'Decision Tree': decision_tree,
                  'KNN': knn,}
        
        predictions = {}
        for name in models:
            predictions[name] = models[name].predict(tree_img)
        
        return Response({'predictions': predictions})

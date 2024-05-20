from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser
from PIL import Image
import numpy as np
import io
from .load_models import ModelLoader


class PredictView(APIView):
    parser_classes = (FileUploadParser,)

    def post(self, request, *args, **kwargs):
        if 'file' not in request.data:
            return Response({'error': 'No file part'}, status=400)
        
        file = request.data['file']
        
        # Open the image using Pillow
        image = Image.open(file)
        
        # Preprocess the image (resize, normalize, etc.)
        image = image.resize((250, 250))
        image = np.array(image) / 255.0    # Normalize pixel values
        
        # TODO: might need to reshape the image depending on the model input shape
        image = np.expand_dims(image, axis=0)

        decision_tree = ModelLoader.get_decision_tree()
        models = {'Decision Tree': decision_tree}
        
        predictions = {}
        for name in models:
            predictions[name] = models[name].predict(image)
        
        return Response({'predictions': predictions})

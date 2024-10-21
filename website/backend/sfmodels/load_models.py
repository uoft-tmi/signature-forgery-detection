import joblib
import os
from tensorflow.keras.models import load_model

TREE_MODEL_PATH = os.path.join(os.path.dirname(__file__), 'tree_model.pkl')
KNN_MODEL_PATH = os.path.join(os.path.dirname(__file__), 'knn_model.pkl')
CNN_MODEL_PATH = os.path.join(os.path.dirname(__file__), 'cnn_model.keras')

class ModelLoader:
    _decision_tree = None
    _knn = None
    _cnn = None
    _pca = None

    @classmethod
    def get_decision_tree(cls):
        if cls._decision_tree is None:
            cls._decision_tree = joblib.load(TREE_MODEL_PATH)
        return cls._decision_tree
    
    @classmethod
    def get_knn(cls):
        if cls._knn is None:
            with open(KNN_MODEL_PATH, 'rb') as model_file:
                data = joblib.load(model_file)
                cls._knn = data['model']
                cls._pca = data['pca']
        return cls._knn
    
    @classmethod
    def get_cnn(cls):
        if cls._cnn is None:
            cls._cnn = load_model(CNN_MODEL_PATH)
        return cls._cnn

    @classmethod
    def get_pca(cls):
        if cls._pca is None:
            with open(KNN_MODEL_PATH, 'rb') as model_file:
                data = joblib.load(model_file)
                cls._pca = data['pca']
        return cls._pca
    
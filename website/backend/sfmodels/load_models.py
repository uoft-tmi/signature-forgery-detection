import joblib
import os

TREE_MODEL_PATH = os.path.join(os.path.dirname(__file__), 'tree_model.pkl')
KNN_MODEL_PATH = os.path.join(os.path.dirname(__file__), 'tree_model.pkl')

class ModelLoader:
    _decision_tree = None
    _knn = None

    @classmethod
    def get_decision_tree(self):
        if self._decision_tree is None:
            self._decision_tree = joblib.load(TREE_MODEL_PATH)
        return self._decision_tree
    
    @classmethod
    def get_knn(self):
        if self._knn is None:
            self._knn = joblib.load(KNN_MODEL_PATH)
        return self._knn
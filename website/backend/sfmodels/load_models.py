import joblib
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model.pkl')

class ModelLoader:
    _decision_tree = None

    @classmethod
    def get_decision_tree(self):
        if self._decision_tree is None:
            self._decision_tree = joblib.load(MODEL_PATH)
        return self._decision_tree
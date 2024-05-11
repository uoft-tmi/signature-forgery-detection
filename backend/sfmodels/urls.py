from django.urls import path
from .views import PredictView

app_name = "sfmodels"

urlpatterns = [
    path("<int:model>/", PredictView.as_view(), name="predict"),
]
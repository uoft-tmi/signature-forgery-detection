import cv2
import numpy as np
from PIL import Image, ImageOps

# takes in the path to the file and returns the image as an array
def preprocess(file: str):
    img = Image.open(file)
    img = img.convert("RGB")
    resized_img = img.resize((250, 250))
    img_array = np.array(resized_img)
    reduced_img = cv2.fastNlMeansDenoising(img_array, None, 15, 7, 21)
    flattened_img = reduced_img.reshape((1, -1))

    return reduced_img, flattened_img
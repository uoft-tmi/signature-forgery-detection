import cv2
import numpy
from numpy import asarray
from PIL import Image, ImageOps

# takes in the path to the file and returns the image as an array
def preprocess(file: str):
    img = Image.open(file)
    gray_img = ImageOps.grayscale(img)
    resized_img = gray_img.resize((250, 250))
    img_array = asarray(resized_img)
    reduced_img = cv2.fastNlMeansDenoising(img_array, None, 15, 7, 21)

    flattened_img = reduced_img.resize((187500,))
    print(numpy.__version__)




    return reduced_img, flattened_img
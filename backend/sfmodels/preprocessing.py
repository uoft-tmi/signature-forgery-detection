import cv2
from numpy import asarray
from PIL import Image, ImageOps

# takes in the path to the file and returns the image as an array
def preprocess(file: str) -> list:
    img = Image.open(file)
    gray_img = ImageOps.grayscale(img)
    resized_img = gray_img.resize((250, 250))
    img_array = asarray(resized_img)
    reduced_img = cv2.fastNlMeansDenoising(img_array, None, 15, 7, 21)
    return reduced_img

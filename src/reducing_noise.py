"""
Reducing noise in data
"""

# Import neceesary libraries
import cv2
import numpy as np
from numpy import asarray
from matplotlib import pyplot as plt

plt.style.use('seaborn')

# Make list of all images
pictures = list(DATA_DIR.glob('*.png'))

# Change paths to string type and store in separate list
images = []
for pic in pictures:
    images.append(str(pic))

# Reduce noise for all images and store in separate list
compare_images = []
for image in images:
    # read image
    noise_pic = cv2.imread(image)
    # change image to nparray form (matrix)
    image_again = asarray(noise_pic)
    # reduce noise in image
    less_noise_pic = cv2.fastNlMeansDenoising(image_again, None, 15, 7, 21)
    # store in a list as tuple form: (original image, modified image)
    compare_images.append((noise_pic, less_noise_pic))

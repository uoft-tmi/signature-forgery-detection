"""
Split Data into Train & Validation Tensorflow Dataframe
"""

import tensorflow as tf
from keras.utils import image_dataset_from_directory
import pathlib

BATCH_SIZE = 32
IMG_HEIGHT = 180
IMG_WIDTH = 180

# Set directory to pull images from
DATA_DIR = pathlib.Path('signatures_combined')

paths = len(list(DATA_DIR.glob('*.png')))
print(paths)

# Split into train
train_ds = tf.keras.utils.image_dataset_from_directory(
    DATA_DIR,
    # labels='inferred',
    validation_split=0.7,
    subset="training",
    seed=1107,
    image_size=(IMG_HEIGHT, IMG_WIDTH),
    batch_size=BATCH_SIZE,
)

# Split into validation
val_ds = tf.keras.utils.image_dataset_from_directory(
    DATA_DIR,
    validation_split=0.15,
    subset="validation",
    seed=1107,
    image_size=(IMG_HEIGHT, IMG_WIDTH),
    batch_size=BATCH_SIZE,
)

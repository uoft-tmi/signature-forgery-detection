import numpy as np
from sklearn.neighbors import KNeighborsClassifier
import matplotlib.pyplot as plt

img_train = np.load("mar24_train_imgs.npy")
y_train = np.load("mar24_train_labels.npy")

img_val = np.load("mar24_val_imgs.npy")
y_val = np.load("mar24_val_labels.npy")

img_test = np.load("mar24_test_imgs.npy")
y_test = np.load("mar24_test_labels.npy")

num_samples, height, width, channels = img_train.shape
num_samples1, height1, width1, channels1 = img_val.shape

img_train = img_train.reshape(num_samples, height * width * channels)
img_val = img_val.reshape(num_samples1, height1 * width1 * channels1)

knn = KNeighborsClassifier(8)
knn.fit(img_train, y_train)

num_samples2, height2, width2, channels2 = img_test.shape
test_img = img_test.reshape(num_samples2, height2 * width2 * channels2)

test_acc = knn.score(test_img, y_test)
print(test_acc * 100)

train_acc = knn.score(img_train, y_train)
print(train_acc * 100)

val_acc = knn.score(img_val, y_val)
print(val_acc * 100)

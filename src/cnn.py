import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, BatchNormalization, Dropout, GlobalAveragePooling2D
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.optimizers import Adam


# Load preprocessed data
new_train_imgs = np.load('mar24_train_imgs.npy')
second_train_imgs = np.load('second_train_imgs.npy')
train_imgs = np.concatenate((new_train_imgs, second_train_imgs))

new_train_labels = np.load('mar24_train_labels.npy')
second_train_labels = np.load('second_train_labels.npy')
train_labels = np.concatenate((new_train_labels, second_train_labels))

new_test_imgs = np.load('mar24_test_imgs.npy')
second_test_imgs = np.load('second_test_imgs.npy')
test_imgs = np.concatenate((new_test_imgs, second_test_imgs))

new_test_labels = np.load('mar24_test_labels.npy')
second_test_labels = np.load('second_test_labels.npy')
test_labels = np.concatenate((new_test_labels, second_test_labels))

new_val_imgs = np.load('mar24_val_imgs.npy')
second_val_imgs = np.load('second_val_imgs.npy')
val_imgs = np.concatenate((new_val_imgs, second_val_imgs))

new_val_labels = np.load('mar24_val_labels.npy')
second_val_labels = np.load('second_val_labels.npy')
val_labels = np.concatenate((new_val_labels, second_val_labels))

# Normalize pixel values to be between 0 and 1
train_imgs = train_imgs.astype('float32') / 255.0
test_imgs = test_imgs.astype('float32') / 255.0
val_imgs = val_imgs.astype('float32') / 255.0

# Use the described CNN architecture
model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(250, 250, 3)),
    MaxPooling2D((2, 2)),

    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    
    Conv2D(128, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    
    Flatten(),
    Dense(64, activation='relu'),
    Dropout(0.2),
    
    Dense(1, activation='sigmoid') 
])

# Compile model
model.compile(
    optimizer = tf.keras.optimizers.Adam(learning_rate=0.0001),
    loss='binary_crossentropy',  
    metrics=['accuracy']
)

# Display model summary
model.summary()

# Train model
history = model.fit(
    train_imgs, train_labels,
    epochs=10,
    batch_size=32,
    validation_data=(val_imgs, val_labels)
)

# Test model
test_loss, test_acc = model.evaluate(test_imgs, test_labels, verbose=2)
print(f'Test accuracy: {test_acc * 100:.2f}%')

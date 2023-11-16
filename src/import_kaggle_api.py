"""
Import and download kaggle api dataset.
GOOGLE COLAB VER.
"""

# Install Kaggle Library
!pip install kaggle

# Before next step, user needs to download the free API KEY from Kaggle settings
# Upload the kaggle.json file to Google Colab Files

# Make directory for Kaggle & Refer to API KEY
! mkdir ~/.kaggle
!cp kaggle.json ~/.kaggle/
! chmod 600 ~/.kaggle/kaggle.json

# Download Dataset
! kaggle datasets download shreelakshmigp/cedardataset

# Make directory to store dataset
! mkdir dataset

# Unzip dataset & store in directory
! unzip cedardataset.zip -d dataset

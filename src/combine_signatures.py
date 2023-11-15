"""
Combine original and forged signature image data into one folder
"""
import os
import shutil

real_sig_dir = 'signatures/full_org'
fake_sig_dir = 'signatures/full_forg'

# Define the destination folder for the combined dataset
destination_folder = 'signatures_combined'

# Ensure the destination folder exists
os.makedirs(destination_folder, exist_ok=True)

# List the files in the source subfolders
files1 = os.listdir(real_sig_dir)
files2 = os.listdir(fake_sig_dir)

# Copy files from the first subfolder to the destination
for file in files1:
    source_file = os.path.join(real_sig_dir, file)
    destination_file = os.path.join(destination_folder, file)
    shutil.copy(source_file, destination_file)

# Copy files from the second subfolder to the destination
for file in files2:
    source_file = os.path.join(fake_sig_dir, file)
    destination_file = os.path.join(destination_folder, file)
    shutil.copy(source_file, destination_file)

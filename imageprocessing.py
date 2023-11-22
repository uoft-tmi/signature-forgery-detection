"""Code is used for processing images"""

from PIL import Image, ImageOps
import os

THRESHOLD = 128


def image_to_grayscale(image_dir: str) -> Image:
    """Used for testing purposes to convert one image to grayscale"""
    image = Image.open(image_dir)
    gray_image = ImageOps.grayscale(image)
    return gray_image


def image_to_bitmap(image: Image) -> Image:
    """Used for testing purposes to convert one iamge to bitmap"""
    bitmap_image = image.point(lambda p: 0 if p < THRESHOLD else 255, 'L')
    bitmap_image.convert('1')
    return bitmap_image


def convert_grayscale(directory: str) -> list[Image]:
    """Converts all images in the given directory into gray scale"""
    converted_images = []
    for filename in os.listdir(directory):
        if filename.endswith(".png"):
            image = Image.open(directory + "/" + filename)
            gray_image = ImageOps.grayscale(image)
            converted_images.append(gray_image)
    return converted_images


def convert_bitmap(images: list[Image]) -> list[Image]:
    """Convert a given image into a binary bitmap"""
    bitmap_images = []
    for gray_image in images:
        bitmap_image = gray_image.point(lambda p: 0 if p < THRESHOLD else 255, 'L')
        bitmap_image = bitmap_image.convert('1')
        bitmap_images.append(bitmap_image)

    return bitmap_images


def resize(images: list[Image], dimensions: tuple) -> None:
    """Resizes all the given images in a list"""
    for i in range(0, len(images)):
        image = images[i]
        images[i] = image.resize(dimensions)


if __name__ == '__main__':
    dimensions = (250, 250) # dimensions for the images, can be changed
    directory = ''  # where the image files are located
    image_path = ''  # where the bitmap images will be stored
    gray_images = convert_grayscale(directory)
    bitmap_images = convert_bitmap(gray_images)
    resize(bitmap_images, dimensions)
    save_images = True

    if not os.path.exists(image_path):
        # If the image path directory does not exist, create it.
        os.makedirs(image_path)

    if save_images:
        for i in range(0, len(bitmap_images)):
            # Saves the bitmap images
            image_filename = os.path.join(image_path, f"image{i}.bmp")
            bitmap_images[i].save(image_filename)

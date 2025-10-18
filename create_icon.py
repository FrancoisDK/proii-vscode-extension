"""
Create a simple, generic icon for the PRO/II VS Code extension
No copyright issues - simple geometric design
"""
from PIL import Image, ImageDraw, ImageFont

# Create 128x128 image (VS Code icon size)
size = 128
img = Image.new('RGB', (size, size), color='#1E1E1E')  # Dark background
draw = ImageDraw.Draw(img)

# Draw a simple chemical engineering symbol
# Outer circle (process unit)
circle_color = '#4EC9B0'  # Cyan/teal - professional engineering color
center = size // 2
radius = 45
draw.ellipse([center - radius, center - radius, center + radius, center + radius], 
             outline=circle_color, width=4)

# Inner squares (representing unit operations)
square_size = 25
draw.rectangle([center - square_size, center - square_size, 
                center + square_size, center + square_size], 
               outline=circle_color, width=3)

# Connection lines (streams)
line_color = '#CE9178'  # Orange - for streams
# Input stream (left)
draw.line([(10, center), (center - square_size, center)], fill=line_color, width=3)
# Output stream (right)
draw.line([(center + square_size, center), (size - 10, center)], fill=line_color, width=3)

# Add text "P2" for PRO/II
try:
    # Try to use a nice font
    font = ImageFont.truetype("arial.ttf", 32)
except:
    # Fallback to default font
    font = ImageFont.load_default()

text = "P2"
# Get text bounding box
bbox = draw.textbbox((0, 0), text, font=font)
text_width = bbox[2] - bbox[0]
text_height = bbox[3] - bbox[1]
text_x = (size - text_width) // 2
text_y = (size - text_height) // 2 - 5

draw.text((text_x, text_y), text, fill='#FFFFFF', font=font)

# Save icon
img.save('proii_icon.png')
print("✅ Generic icon created: proii_icon.png")
print("   - Simple geometric design")
print("   - No copyright issues")
print("   - Professional engineering colors")

"""
Create a simple, generic icon for the PRO/II VS Code extension using SVG
No dependencies needed - pure SVG that can be converted to PNG
No copyright issues - simple geometric design
"""

svg_content = '''<?xml version="1.0" encoding="UTF-8"?>
<svg width="128" height="128" xmlns="http://www.w3.org/2000/svg">
  <!-- Dark background -->
  <rect width="128" height="128" fill="#1E1E1E"/>
  
  <!-- Outer circle (process unit symbol) -->
  <circle cx="64" cy="64" r="45" fill="none" stroke="#4EC9B0" stroke-width="4"/>
  
  <!-- Inner square (unit operation) -->
  <rect x="39" y="39" width="50" height="50" fill="none" stroke="#4EC9B0" stroke-width="3"/>
  
  <!-- Input stream (left arrow) -->
  <line x1="10" y1="64" x2="39" y2="64" stroke="#CE9178" stroke-width="3"/>
  <polygon points="15,59 10,64 15,69" fill="#CE9178"/>
  
  <!-- Output stream (right arrow) -->
  <line x1="89" y1="64" x2="118" y2="64" stroke="#CE9178" stroke-width="3"/>
  <polygon points="113,59 118,64 113,69" fill="#CE9178"/>
  
  <!-- Text "P2" for PRO/II -->
  <text x="64" y="74" font-family="Arial, sans-serif" font-size="32" 
        font-weight="bold" fill="#FFFFFF" text-anchor="middle">P2</text>
</svg>'''

# Save SVG
with open('proii_icon.svg', 'w') as f:
    f.write(svg_content)

print("✅ Generic SVG icon created: proii_icon.svg")
print("")
print("To convert to PNG (128x128), you can:")
print("1. Open in browser and take screenshot")
print("2. Use online converter: https://cloudconvert.com/svg-to-png")
print("3. Or use ImageMagick: magick convert proii_icon.svg proii_icon.png")
print("")
print("Icon design:")
print("  - Circle + Square = Process unit operation symbol")
print("  - Arrows = Input/Output streams")
print("  - P2 = PRO/II abbreviated")
print("  - Colors: Cyan (equipment), Orange (streams)")
print("  - No copyright issues - original geometric design")

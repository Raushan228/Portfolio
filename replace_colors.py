import os

file_path = "c:\\Users\\ASUS\\Desktop\\portfolio sarthak\\style.css"
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace variables
content = content.replace("--bg-color: #0B0D06;", "--bg-color: #604f71;")
content = content.replace("--second-bg-color: #060701;", "--second-bg-color: #807094;")
content = content.replace("--text-color: #cbd5e1;", "--text-color: #fcfcfb;")
content = content.replace("--main-color: #B89B6F;", "--main-color: #ef98a7;")
content = content.replace("--hover-color: #E2D288;", "--hover-color: #f7bea9;")
content = content.replace("--glow-color: rgba(184, 155, 111, 0.4);", "--glow-color: rgba(239, 152, 167, 0.4);")

# Replace hardcoded RGBA
content = content.replace("184, 155, 111", "239, 152, 167")
content = content.replace("11, 13, 6", "96, 79, 113")
content = content.replace("6, 7, 1", "128, 112, 148")
content = content.replace("#f8fafc", "#fcfcfb")
content = content.replace("#cbd5e1", "#fcfcfb")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Colors updated in style.css")

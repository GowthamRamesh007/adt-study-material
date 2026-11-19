import subprocess
import os

uploads_dir = r"C:\Users\gowth\AppData\Local\Claude-3p\local-agent-mode-sessions\d2b0adc1\00000000\8dd96686\uploads"
output_dir = r"C:\Users\gowth\AppData\Local\Claude-3p\local-agent-mode-sessions\d2b0adc1\00000000\8dd96686\outputs"

doc_files = [
    "IAT 2 ADT set A 23-27.doc",
    "IAT 1 ADT set A.doc",
    "IA 1 ADT set B.doc",
    "IAT 2 ADT set B 23-27.doc"
]

for doc_file in doc_files:
    input_path = os.path.join(uploads_dir, doc_file)
    output_file = doc_file.replace('.doc', '.txt')
    output_path = os.path.join(output_dir, output_file)

    try:
        # Try using antiword first (if available)
        result = subprocess.run(['antiword', input_path],
                              capture_output=True, text=True, timeout=10)
        if result.returncode == 0:
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(f"=== {doc_file} ===\n\n")
                f.write(result.stdout)
            print(f"Extracted {doc_file} using antiword")
        else:
            # Try textutil (macOS) or catdoc as fallback
            try:
                result = subprocess.run(['catdoc', input_path],
                                      capture_output=True, text=True, timeout=10)
                if result.returncode == 0:
                    with open(output_path, 'w', encoding='utf-8') as f:
                        f.write(f"=== {doc_file} ===\n\n")
                        f.write(result.stdout)
                    print(f"Extracted {doc_file} using catdoc")
            except:
                print(f"Failed to extract {doc_file}")
    except Exception as e:
        print(f"Error processing {doc_file}: {e}")

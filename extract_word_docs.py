import os
import sys

# Try to use win32com for older .doc files
try:
    import win32com.client

    uploads_dir = r"C:\Users\gowth\AppData\Local\Claude-3p\local-agent-mode-sessions\d2b0adc1\00000000\8dd96686\uploads"
    output_dir = r"C:\Users\gowth\AppData\Local\Claude-3p\local-agent-mode-sessions\d2b0adc1\00000000\8dd96686\outputs"

    doc_files = [
        "IAT 2 ADT set A 23-27.doc",
        "IAT 1 ADT set A.doc",
        "IA 1 ADT set B.doc",
        "IAT 2 ADT set B 23-27.doc"
    ]

    word = win32com.client.Dispatch("Word.Application")
    word.Visible = False

    for doc_file in doc_files:
        print(f"\nProcessing: {doc_file}")
        input_path = os.path.abspath(os.path.join(uploads_dir, doc_file))
        output_file = doc_file.replace('.doc', '_extracted.txt')
        output_path = os.path.abspath(os.path.join(output_dir, output_file))

        try:
            doc = word.Documents.Open(input_path)
            content = doc.Content.Text
            doc.Close(False)

            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(f"=== {doc_file} ===\n\n")
                f.write(content)

            print(f"✓ Successfully extracted {doc_file}")
        except Exception as e:
            print(f"✗ Error with {doc_file}: {e}")

    word.Quit()
    print("\n✓ All files processed!")

except ImportError:
    print("win32com not available. Installing pywin32...")
    import subprocess
    subprocess.run([sys.executable, "-m", "pip", "install", "pywin32"], check=True)
    print("Please run the script again.")

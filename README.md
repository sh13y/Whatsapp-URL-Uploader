# WhatsApp URL Uploader

Welcome to the WhatsApp URL Uploader! 🎉 This nifty tool lets you share a bunch of URLs (like videos, images, documents, etc.) to WhatsApp groups using the Baileys library. It’s like having your own personal WhatsApp butler!

## Features
- 📤 Upload and share multiple URLs to specified WhatsApp groups in sequential order.
- 🕵️‍♂️ Dynamically detect file MIME types to decide whether to send images, videos, audio, documents, or unsupported file types.
- 🚫 Designed for personal or educational purposes, not for spamming or violating WhatsApp's terms.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Supported MIME Types](#supported-mime-types)
- [Limitations](#limitations)
- [Disclaimer](#disclaimer)
- [License](#license)
- [Contributing](#contributing)
- [Acknowledgments](#acknowledgments)

## Installation

### Clone the Repository
First, grab the code from GitHub. Open your terminal and run:

```bash
git clone https://github.com/sh13y/whatsapp-url-uploader.git
cd whatsapp-url-uploader
```

### Install Dependencies
Make sure you have Node.js installed. Then, install the necessary packages:

```bash
npm install
```

### Environment Setup
Create a `.env` file to store your WhatsApp session data and group IDs. It’s like your secret recipe!

```env
AUTH_PATH=<auth_info path>
GROUP_IDS="<group_id_1>,<group_id_2>"
BOT_BROWSER_NAME=<bot_name>
BOT_BROWSER_TYPE=<browser_type>
BOT_BROWSER_VERSION=<browser_version>
```

### Start the Application
Fire up the app with:

```bash
npm start
```

## Usage
After starting the application, use the command:

```bash
upload <URL>
```

### Example:
```bash
upload https://example.com/sample-image.jpg
```

To upload multiple URLs sequentially, just list them one after another:

```bash
u2g https://example.com/file1.jpg
https://example.com/file2.mp4
https://example.com/file3.pdf
```

The tool will process and upload each URL in the order provided. It’s like magic! 🪄

### Bot Commands
- **`on`**: Turn the bot on. (If it’s already on, it will let you know.)
- **`off`**: Turn the bot off. (If it’s already off, it will let you know.)
- **`alive`**: Check if the bot is alive. (Spoiler: It will tell you it is!)

## Supported MIME Types
The following file types are supported:

- **Images:** `image/jpeg`, `image/png`, `image/gif`
- **Videos:** `video/mp4`, `video/mkv`
- **Audio:** `audio/mpeg`, `audio/ogg`
- **Documents:** `application/pdf`, `application/zip`, `application/x-rar-compressed`

If an unsupported MIME type is detected, the tool will politely let you know.

## Limitations
- **Unofficial WhatsApp API:** This project uses Baileys, an unofficial WhatsApp Web API. Use at your own risk, as it may violate WhatsApp's terms of service.
- **File Size:** WhatsApp has limitations on file sizes. Ensure your files comply with WhatsApp's restrictions.
- **Error Handling:** Some URLs may fail to upload due to invalid links, unsupported MIME types, or WhatsApp server issues.

## Disclaimer
This project is intended for personal and educational purposes only. Do not use this tool for spamming, violating privacy, or sharing copyrighted content without permission. The developer of this project are not responsible for any misuse or violations of WhatsApp’s terms of service. Use responsibly and ensure compliance with applicable laws and regulations.

## License
This project is licensed under the WTFPL License. See the LICENSE file for details.

## Contributing
Contributions are welcome! If you encounter issues or have ideas for improvement:

1. Fork the repository.
2. Make your changes.
3. Submit a pull request.

## Acknowledgments
- **Baileys** for providing the foundation to interact with WhatsApp.
- **mime-types** for MIME type detection.

## Screenshots
Here are some screenshots to give you an idea of how the tool works:

![Screenshot 1](samples/Image%202025-01-07%20at%2019.48.36.jpeg)
![Screenshot 2](samples/Image%202025-01-07%20at%2019.48.36.jpeg)

Happy uploading! 🚀
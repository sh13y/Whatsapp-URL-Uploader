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
This project is intended for educational and personal use only. Please be aware of the following:

- **Educational Purpose**: This tool is developed solely for learning and understanding WhatsApp Web API integration using the Baileys library.
- **Unofficial API**: This project uses Baileys, an unofficial WhatsApp Web API. It is not affiliated with or endorsed by WhatsApp Inc.
- **Terms of Service**: Using unofficial APIs may violate WhatsApp's Terms of Service. For production or business use, please consider using the official WhatsApp Business API.
- **No Warranty**: This software is provided "as is", without warranty of any kind. The developers are not responsible for any consequences resulting from its use.
- **Responsible Usage**: Users must:
  - Respect WhatsApp's policies and guidelines
  - Obtain consent before adding the bot to any group
  - Not use the tool for spam or harassment
  - Comply with local laws and regulations regarding automated messaging
  - Not use for commercial purposes without proper authorization
- **Data Privacy**: Users are responsible for protecting any personal data processed through this tool and ensuring compliance with applicable privacy laws (GDPR, CCPA, etc.).

By using this tool, you acknowledge these limitations and agree to use it responsibly. The developers disclaim any liability for misuse or violations of WhatsApp's terms of service.

## License
This project is licensed under the WTFPL License. See the LICENSE file for details.

## Contributing
Contributions are welcome! If you encounter issues or have ideas for improvement:

1. Fork the repository.
2. Make your changes.
3. Submit a pull request.

## Acknowledgments
This project is powered by [Baileys](https://github.com/WhiskeySockets/Baileys), an amazing WhatsApp Web API library for Node.js. Special thanks to:
- [**adiwajshing**](https://github.com/adiwajshing) - The original author of Baileys
- [**WhiskeySockets**](https://github.com/WhiskeySockets) - Current maintainers of the Baileys library

Their incredible work makes this WhatsApp URL Uploader possible!
- **mime-types** for MIME type detection.

## Screenshots
Here are some screenshots to give you an idea of how the tool works:

![Screenshot 1](samples/Image%202025-01-07%20at%2019.48.36.jpeg)
![Screenshot 2](samples/Image%202025-01-07%20at%2019.48.37.jpeg)

Happy uploading! 🚀

---

Made with ❤️ in Ceylon 🇱🇰 by [sh13y](https://github.com/sh13y)
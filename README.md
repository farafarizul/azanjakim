# AzanJakim 🕌🚀

A small, friendly repo for working with Azan (call to prayer) times and JAKIM timetables. This repository contains utilities, scripts, and examples to fetch, display, and schedule prayer times — useful for home automations, bots, or personal reminders. 🙏

## Features ✨
- Fetch prayer times for a location (JAKIM-compatible formats)
- Simple scripts to display or export schedules
- Hooks/examples for scheduling notifications (cron, systemd, task runners)
- Easy to extend for integrations (Telegram, Home Assistant, etc.)

## Quick Start ⚡
```bash
# Clone the repo
git clone https://github.com/farafarizul/azanjakim.git
cd azanjakim

# (Optional) Python virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install deps if present
pip install -r requirements.txt
```

## Usage 🧭
- Look in the scripts/ or src/ directory for runnable examples.
- Example (replace with the actual script name if different):
```bash
python scripts/get_prayer_times.py --location "Kuala Lumpur"
```
- For recurring reminders, schedule the script with cron, systemd timers, or your preferred scheduler.

## Configuration 🔧
- Keep API keys and secrets out of the repo. Use environment variables or a .env file.
- Example .env (do NOT commit this file):
```
AZAN_API_KEY=your_api_key_here
LOCATION="Kuala Lumpur"
TIMEZONE="Asia/Kuala_Lumpur"
```

## Scheduling Suggestions ⏰
- Cron example (runs daily at 00:05):
```cron
5 0 * * * /path/to/venv/bin/python /path/to/azanjakim/scripts/get_prayer_times.py --location "Kuala Lumpur" >> /var/log/azan.log 2>&1
```
- You can also integrate with Home Assistant automations, Telegram bots, or push notifications.

## Example Output 🖨️
- The scripts typically print JSON or a simple table:
```
Fajr    05:47
Dhuhr   13:05
Asr     16:00
Maghrib 19:12
Isha    20:25
```

## Contributing 💖
Contributions are welcome! A simple workflow:
1. Fork the repo
2. Create a feature branch: git checkout -b feature/my-feature
3. Commit your changes and push
4. Open a Pull Request describing your changes

Please add tests for new features when possible and keep changes focused.

## Roadmap 🛣️
- Add official JAKIM timetable parser
- Add timezone-aware scheduling helpers
- Provide integrations (Telegram, Home Assistant, mobile push)

## License 📜
No license file included by default. Add a LICENSE (MIT, Apache-2.0, etc.) to make the project open-source under a recognized license.

## Maintainer ✉️
- @farafarizul

Thanks for checking out AzanJakim — may this make managing prayer times easier! 🙏
import {
  Crop,
  Sigma,
  KeyRound,
  Volume2,
  QrCode,
  Wand2,
  Timer,
  Hourglass,
  Scale,
  Pipette,
  NotebookText,
  CalendarDays,
  Cake,
  HeartPulse,
  Calculator,
  Landmark,
  Globe,
  ClipboardList,
  Binary,
  ScrollText,
  DollarSign,
  Split,
  Merge,
  Square,
  type LucideIcon,
} from 'lucide-react';

export interface Tool {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  details?: string;
}

export const tools: Tool[] = [
  {
    slug: 'square-meter-calculator',
    name: 'Square Meter Calculator',
    description: 'Calculate area or volume from length, width, and thickness measurements.',
    icon: Square,
    details: `### How to Use
1.  **Select Calculation Type:** Choose between "Area (L x W)" for simple area or "Area per 2mm" for a specialized calculation involving thickness.
2.  **Enter Dimensions:** Input the length, width, and (if applicable) thickness of your object.
3.  **Select Units:** For each dimension, select the appropriate unit from the dropdown (e.g., meters, cm, mm, feet, inches).
4.  **Set Quantity:** Enter the number of items you are calculating for.
5.  **View Result:** The calculated result in square meters (m²) will be displayed automatically.

### Common Uses
This calculator is versatile and useful for a variety of projects, including flooring estimates, construction material planning, gardening, and any other task where you need to determine the surface area of an object or space. The "Area per 2mm" option is specialized for industries where material volume is measured against a standard thickness.`
  },
  {
    slug: 'image-cropper',
    name: 'Image Cropper',
    description: 'Easily crop images with a simple drag-and-drop interface. Export in various formats.',
    icon: Crop,
    details: `### How to Use
1.  **Upload Image:** Click the upload area or drag and drop an image file (e.g., JPG, PNG) from your computer.
2.  **Adjust Crop Area:** A resizable box will appear. Drag the box to move it, or pull the handles to resize it.
3.  **Crop & Download:** Click "Crop Image." You can then select an export format (PNG, JPEG, or WebP) and download your new image.

### Why Use an Image Cropper?
Cropping helps you remove unwanted parts of an image, change its aspect ratio, or improve composition by focusing on the subject. It's perfect for preparing images for social media, website banners, or any project needing a specific portion of a picture. Our tool is fast, free, and private, as all processing happens in your browser.`
  },
  {
    slug: 'text-counter',
    name: 'Text Counter',
    description: 'Count characters, words, sentences, and paragraphs in your text instantly.',
    icon: Sigma,
    details: `### How to Use
Simply paste or type your text into the text area. The counters for characters, words, sentences, and paragraphs will update in real-time as you type.

### Who is this for?
This tool is invaluable for writers, students, social media managers, and anyone who needs to meet specific length requirements. Whether you're writing an essay, a tweet, or a blog post, the Text Counter helps you stay within limits and track your progress effortlessly.`
  },
  {
    slug: 'password-generator',
    name: 'Password Generator',
    description: 'Create strong, customizable passwords with adjustable length and character sets.',
    icon: KeyRound,
    details: `### How to Use
1.  **Set Length:** Use the slider to choose the desired length for your password (from 8 to 64 characters).
2.  **Select Options:** Check the boxes to include uppercase letters, lowercase letters, numbers, and symbols.
3.  **Generate:** Click the "Generate" button (the refresh icon). A new, strong password will appear in the input field.
4.  **Copy:** Click the copy icon to copy the password to your clipboard.

### Why Use a Strong Password?
In today's digital world, a strong, unique password for each of your online accounts is your first line of defense against unauthorized access. This tool helps you create highly secure passwords that are difficult to guess or crack.`
  },
  {
    slug: 'text-to-speech',
    name: 'Text to Speech',
    description: 'Convert any text into natural-sounding speech and listen directly in your browser.',
    icon: Volume2,
    details: `### How to Use
1.  **Enter Text:** Type or paste the text you want to hear into the text area.
2.  **Choose a Voice:** Select from a list of available voices and languages provided by your browser.
3.  **Play:** Click the "Speak" button to listen. You can also pause, resume, and stop the playback.

### Benefits of Text-to-Speech
This tool is great for accessibility, allowing users with visual impairments to consume written content. It's also useful for proofreading, as hearing your text read aloud can help you catch errors. You can even use it to listen to articles or documents while you multitask.`
  },
  {
    slug: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes from any text or link. Copy or download the image.',
    icon: QrCode,
    details: `### How to Use
1.  **Enter Data:** Type or paste the URL, text, or message you want to encode into the input field.
2.  **Generate:** Click the "Generate QR Code" button. The QR code image will appear below.
3.  **Download:** Click the "Download PNG" button to save the QR code image to your device.

### What are QR Codes Used For?
QR (Quick Response) codes are a convenient way to share information. They can store URLs, contact information, Wi-Fi network details, and more. People can scan them with their smartphone cameras to quickly access the information without typing.`
  },
  {
    slug: 'text-variation-generator',
    name: 'Text Variation Generator',
    description: 'Use AI to rewrite your text with different tones and vocabulary to find the perfect phrasing.',
    icon: Wand2,
    details: `### How to Use
1.  **Enter Your Text:** Write or paste the text you want to transform.
2.  **Set Options:** Choose the number of variations you want. You can also specify a desired tone (e.g., "professional," "witty") and vocabulary style (e.g., "simple," "eloquent") to guide the AI.
3.  **Generate:** Click the "Generate Variations" button. The AI will provide alternative versions of your text.

### Why Rewrite Text?
This AI-powered tool is perfect for content creators, marketers, and students who want to improve their writing. It can help you find more engaging ways to phrase an idea, adapt your message for different audiences, or simply overcome writer's block by suggesting new perspectives.`
  },
  {
    slug: 'online-stopwatch',
    name: 'Online Stopwatch',
    description: 'A simple and accurate stopwatch with lap time functionality for all your timing needs.',
    icon: Timer,
    details: `### How to Use
- **Start/Pause:** Click the "Start" button to begin timing. The same button becomes "Pause" to halt the timer.
- **Lap:** While the stopwatch is running, click the "Lap" button to record the current time without stopping the main timer. Lap times will appear in the list below.
- **Reset:** Click "Reset" to stop the timer and clear all recorded time and laps.

### Perfect For
This tool is ideal for tracking workouts, timing experiments, managing study sessions, or any activity where precise timing is needed. The lap feature allows you to measure intervals within a larger timed event.`
  },
  {
    slug: 'online-timer',
    name: 'Online Timer',
    description: 'Set a countdown timer for any task. Get notified when the time is up.',
    icon: Hourglass,
    details: `### How to Use
1.  **Set Duration:** Enter the desired hours, minutes, and seconds in the input fields.
2.  **Start:** Click the "Start" button to begin the countdown.
3.  **Control:** You can "Pause" the timer and "Resume" it. The "Reset" button will return the timer to its initial set time.
4.  **Notification:** When the timer reaches zero, an alarm sound will play.

### Why Use a Timer?
A countdown timer is a great productivity tool. It can help you focus on a task for a set period (like the Pomodoro Technique), manage your time in the kitchen, or remind you to take a break.`
  },
  {
    slug: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between common units of length, weight, temperature, area, and volume.',
    icon: Scale,
    details: `### How to Use
1.  **Select Category:** Choose the type of measurement you want to convert (e.g., Length, Weight, Temperature).
2.  **Enter Value:** Input the number you want to convert in the "From" field.
3.  **Select Units:** Choose the starting unit and the target unit from the dropdown menus.
4.  **View Result:** The converted value will automatically appear in the "To" field.

### A Tool for Everyone
Unit conversions are needed in many fields, including science, cooking, construction, and international travel. This tool provides quick and accurate conversions for the most commonly used units, saving you from complex manual calculations.`
  },
  {
    slug: 'color-picker',
    name: 'Color Picker',
    description: 'Pick a color from an interactive palette and get its Hex and RGB codes instantly.',
    icon: Pipette,
    details: `### How to Use
1.  **Pick a Color:** Click on the large color circle to open your system's native color picker. Select any color you like.
2.  **Get Codes:** The tool will instantly display the selected color along with its corresponding HEX and RGB values.
3.  **Copy:** Click the copy icon next to either the HEX or RGB code to copy it to your clipboard.

### Who Needs This?
This tool is essential for web designers, developers, and graphic artists who need to work with specific color codes. It provides a quick and easy way to identify and share exact colors for use in digital projects.`
  },
  {
    slug: 'online-notepad',
    name: 'Online Notepad',
    description: 'A simple text editor that automatically saves your notes to your browser.',
    icon: NotebookText,
    details: `### How to Use
Just start typing! There is no save button because your text is automatically saved to your browser's local storage every time you make a change. You can close the tab and come back later, and your notes will still be here.

### Privacy and Convenience
This tool offers the ultimate convenience for quick note-taking without needing an account or installing software. Since all data is stored locally on your machine, it's also completely private. It's perfect for jotting down temporary thoughts, drafting messages, or storing snippets of code.`
  },
  {
    slug: 'date-calculator',
    name: 'Date Calculator',
    description: 'Calculate the difference between two dates or add/subtract days from a date.',
    icon: CalendarDays,
    details: `### How to Use
This tool has two modes:
1.  **Calculate Duration:** Select a "From Date" and a "To Date" using the calendar pop-ups. Click "Calculate Duration" to see the total number of days between them.
2.  **Add/Subtract Days:** Choose a "Start Date," select whether to "Add" or "Subtract," and enter the number of days. Click "Calculate Date" to find the resulting date.

### Everyday Uses
This calculator is useful for project planning, counting down to an event, calculating deadlines, or figuring out historical timelines.`
  },
  {
    slug: 'age-calculator',
    name: 'Age Calculator',
    description: 'Find out your exact age in years, months, and days based on your birthdate.',
    icon: Cake,
    details: `### How to Use
1.  **Pick Your Date of Birth:** Click the button and select your birthdate from the calendar pop-up. You can easily navigate through years and months.
2.  **Calculate Age:** Click the "Calculate Age" button.
3.  **See Your Age:** The tool will display your precise age in years, months, and days.

### More Than Just a Number
Knowing your exact age can be useful for filling out applications, checking eligibility for certain events, or just for fun!`
  },
  {
    slug: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index (BMI) to check your health status.',
    icon: HeartPulse,
    details: `### How to Use
1.  **Select Units:** Choose between Metric (cm, kg) or Imperial (ft, in, lbs) units.
2.  **Enter Measurements:** Input your height and weight into the appropriate fields.
3.  **View Results:** The calculator will instantly show your BMI score and the corresponding category (e.g., Underweight, Normal weight, Overweight).

### What is BMI?
Body Mass Index (BMI) is a widely used measure that uses your height and weight to determine if your weight is healthy. It's a useful starting point for understanding your overall health, but remember that it doesn't account for factors like muscle mass. Always consult a healthcare professional for medical advice.`
  },
  {
    slug: 'tip-calculator',
    name: 'Tip Calculator',
    description: 'Quickly calculate the tip and split the bill for your next meal out.',
    icon: Calculator,
    details: `### How to Use
1.  **Enter Bill Amount:** Input the total amount from your bill.
2.  **Set Tip Percentage:** Use the slider to adjust the tip percentage to your desired amount.
3.  **Enter Number of People:** Input the number of people who are splitting the bill.
4.  **View Results:** The calculator will display the total tip amount, the total bill including tip, and the amount each person should pay.

### Take the Guesswork Out of Tipping
This tool makes it easy to calculate tips and split bills, especially when dining with a group. It ensures fairness and accuracy, so you can end your meal on a high note.`
  },
  {
    slug: 'loan-calculator',
    name: 'Loan Calculator',
    description: 'A basic simple-interest loan calculator to estimate your payments.',
    icon: Landmark,
    details: `### How to Use
1.  **Enter Loan Amount:** Input the total principal amount of the loan.
2.  **Enter Interest Rate:** Provide the annual interest rate (as a percentage).
3.  **Enter Loan Term:** Input the duration of the loan in years.
4.  **View Results:** The tool calculates the total simple interest you will pay over the life of the loan and the total amount you will have paid back (principal + interest).

### Important Note
This calculator uses a **simple interest** formula, which is straightforward but less common for consumer loans like mortgages or car loans (which typically use compound interest). This tool is best for getting a basic, high-level estimate.`
  },
  {
    slug: 'time-zone-converter',
    name: 'Time Zone Converter',
    description: 'Easily convert time between different common time zones around the world.',
    icon: Globe,
    details: `### How to Use
The tool automatically detects your local time and time zone. To convert it, simply select a target time zone from the dropdown menu. The converted time will be displayed instantly.

### Why is this useful?
This tool is essential for anyone who works with international teams, schedules meetings across different regions, or travels frequently. It helps you avoid confusion and stay on schedule with people around the globe.`
  },
  {
    slug: 'clipboard-history',
    name: 'Clipboard History',
    description: 'Keep a history of text you copy. Stored locally in your browser for privacy.',
    icon: ClipboardList,
    details: `### How to Use
This tool works in the background. As you copy text on your computer (using Ctrl+C or Cmd+C), each new text item is automatically added to the top of the history list. The tool stores up to 50 recent items.
- **Copy from History:** Click the copy icon next to any item to copy it back to your clipboard.
- **Clear History:** Click the "Clear History" button to erase all stored items.

### Privacy-Focused
Your clipboard history is saved in your browser's local storage, meaning it never leaves your computer. This ensures your data remains private and secure.`
  },
  {
    slug: 'binary-converter',
    name: 'Binary/Dec/Hex Converter',
    description: 'Convert numbers between binary, decimal, and hexadecimal systems.',
    icon: Binary,
    details: `### How to Use
Simply type a number into any of the three fields (Decimal, Binary, or Hexadecimal). As you type, the other two fields will automatically update with the converted values.

### Who is this for?
This converter is a must-have for programmers, computer science students, and network engineers. It simplifies the process of working with different number systems that are fundamental to computing.`
  },
  {
    slug: 'roman-numeral-converter',
    name: 'Roman Numeral Converter',
    description: 'Convert standard numbers to Roman numerals and vice-versa with ease.',
    icon: ScrollText,
    details: `### How to Use
The conversion works both ways instantly.
- **Number to Roman:** Type a standard number (e.g., 2024) into the "Number" field, and its Roman numeral equivalent (MMXXIV) will appear in the "Roman Numeral" field.
- **Roman to Number:** Type a Roman numeral into the "Roman Numeral" field, and the corresponding number will appear in the "Number" field.

### Fun and Practical
This tool is great for students learning about Roman numerals, for researchers, or for anyone curious about this ancient number system. It handles conversions for numbers between 1 and 3999.`
  },
  {
    slug: 'currency-converter',
    name: 'Currency Converter',
    description: 'Convert between major currencies with mock exchange rates.',
    icon: DollarSign,
    details: `### How to Use
1.  **Enter Amount:** Input the amount of money you want to convert.
2.  **Select Currencies:** Choose the currency you are converting "From" and the currency you want to convert "To" using the dropdowns.
3.  **View Result:** The converted amount is displayed instantly.
4.  **Swap:** Click the arrow icon to swap the "From" and "To" currencies.

### Disclaimer
The exchange rates used in this tool are for demonstration purposes only and are not updated in real-time. This calculator should not be used for actual financial transactions.`
  },
  {
    slug: 'pdf-splitter',
    name: 'PDF Splitter',
    description: 'Extract specific pages or page ranges from a PDF file.',
    icon: Split,
    details: `### How to Use
1.  **Upload PDF:** Click to select or drag and drop your PDF file into the upload area.
2.  **Specify Pages:** In the "Pages to split" input box, enter the page numbers or ranges you want to extract. You can separate multiple entries with commas (e.g., "1-3, 5, 8-10").
3.  **Split PDF:** Click the "Split PDF" button.
4.  **Download Files:** The tool will generate new PDF files for each range or page you specified. Click "Download" next to each file to save it.

### Secure and Private
All PDF processing is done directly in your browser. Your files are never uploaded to a server, ensuring your data remains private and secure.`
  },
  {
    slug: 'pdf-merger',
    name: 'PDF Merger',
    description: 'Combine multiple PDF files into a single document.',
    icon: Merge,
    details: `### How to Use
1.  **Add PDFs:** Click to select or drag and drop two or more PDF files into the upload area.
2.  **Order Files:** The uploaded files will appear in a list. You can drag and drop them or use the arrow buttons to reorder them as needed.
3.  **Merge PDFs:** Once your files are in the correct order, click the "Merge PDFs" button.
4.  **Download:** Click the "Download Merged PDF" button to save your combined file.

### Why Merge PDFs?
This tool is perfect for combining reports, presentations, or separate chapters of a document into one single, easy-to-share file. The entire process is secure as it happens on your own computer.`
  },
];

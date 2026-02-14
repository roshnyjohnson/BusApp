<p align="center">
  <img src="./img.png" alt="Project Banner" width="100%">
</p>

# Bus Track 🎯

## Basic Details

### Team Name: GROW

### Team Members
- Member 1: Roshny Johnson - RIT Kottayam
- Member 2: Gauri Lakshmi - RIT Kottayam

### Hosted Project Link
https://bus-tracker-e0905.web.app/

### Project Description
This project is a real-time bus tracking system that allows drivers to update their bus location using GPS and enables students to view live bus locations.

### The Problem statement
Students often struggle to know the real-time location of college buses, causing delays and missed rides. Traditional schedules and manual updates are slow and unreliable.
* To solve the problem of students not knowing real-time bus locations by providing a secure, GPS-based bus tracking system that updates live locations via Firebase for instant student access.

### The Solution
We developed a real-time bus tracking system where bus drivers can securely log in and update their bus location using their mobile devices. Students can access live bus locations instantly without logging in, ensuring a seamless and convenient tracking experience.

---

## Technical Details

### Technologies/Components Used

**For Software:**
- Languages used: JavaScript, HTML, CSS
- Frameworks used: React
- Libraries used: Firebase SDK (Authentication & Realtime Database), React Router, Tailwind CSS
- Tools used: VS Code, Git, Firebase Console
  
---

## Features

List the key features of your project:
- Secure Driver Login – Drivers can securely log in using Firebase Authentication to update bus locations.
- Real-Time GPS Tracking – Drivers can update the bus location via their mobile devices, which is reflected instantly in the system.
- Live Student Access – Students can view the live bus positions on a map without needing to log in.
- Shows ETA - Students can view the estimated time of arrival based on the speed and location of the bus.
- Role-Based Access & Responsive UI – Separate secure functionalities for drivers and students.

---

## Implementation

### For Software:

#### Installation
Installation commands - npm install

#### Run
Run commands - npm run dev

---

## Project Documentation

### For Software:

#### Screenshots (Add at least 3)

<img width="1909" height="1070" alt="image" src="https://github.com/user-attachments/assets/fc7ee274-9fe4-45dc-9827-9d60179f0748" />
This is the open page for the students to track those buses whose drivers has enabled their location access.

<img width="1903" height="753" alt="image" src="https://github.com/user-attachments/assets/b2d098ec-a098-4f9c-97ec-9bb909db4199" />

This shows the Driver's Dashboard - After the authentication of location

<img width="907" height="816" alt="image" src="https://github.com/user-attachments/assets/e570fc42-ef38-447b-8506-2da8e1b90d51" />

This is the login page for the registered drivers

#### Diagrams

**System Architecture:**

![Architecture Diagram](docs/architecture.png)
*Explain your system architecture - components, data flow, tech stack interaction*

**Application Workflow:**

![Workflow](docs/workflow.png)
*Add caption explaining your workflow*

---

#### Build Photos

![WhatsApp Image 2026-02-14 at 9 32 30 AM](https://github.com/user-attachments/assets/821a020d-0f22-483b-96a2-05be57668a07)


## Additional Documentation

### For Web Projects with Backend:

#### API Documentation

**Base URL:** https://bus-tracker-e0905-default-rtdb.asia-southeast1.firebasedatabase.app/



**POST /api/bus-data**
- **Description:** : Adds or updates bus, driver, and user data in the system.
- **Request Body:**
{
  "buses": {
    "bus4": {
      "lat": 0,
      "lng": 0,
      "timestamp": 0
    }
  },
  "users": {
    "apK1Pg83nPdkY0BjPivULbGagZ52": {
      "email": "mrdriver@college.com",
      "role": "driver"
    },
    "iTfGFfdc9Bg3GnlZkb3gPaG1mRH3": {
      "email": "missdriver@college.com",
      "role": "driver"
    },
    "pr62NeaCMUYud4fDrFGEgyVlHzh2": {
      "email": "driver5@college.com",
      "role": "driver"
    }
  }
}

---

#

```



## Project Demo

### Video
[Add your demo video link here - YouTube, Google Drive, etc.]

*Explain what the video demonstrates - key features, user flow, technical highlights*

### Additional Demos
[Add any extra demo materials/links - Live site, APK download, online demo, etc.]

---

## AI Tools Used (Optional - For Transparency Bonus)

If you used AI tools during development, document them here for transparency:

**Tool Used:** Gemini 3, Chatgpt 4.0

**Purpose:** 
- Chatgpt: "Assisted in designing project flow"
- Gemini: "Debugging assistance "

---

## Team Contributions

- Roshny Johnson: Specific contributions -  Backend development, Database design , API integration
- Gauri Lakshmi: Specific contributions - Frontend development, UI/UX design, Testing, Documentation
  
---

## License

This project is licensed under the [LICENSE_NAME] License - see the [LICENSE](LICENSE) file for details.

**Common License Options:**
- MIT License (Permissive, widely used)
- Apache 2.0 (Permissive with patent grant)
- GPL v3 (Copyleft, requires derivative works to be open source)

---

Made with ❤️ at TinkerHub

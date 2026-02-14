
# Bus Track 🎯

## Basic Details

### Team Name: GROW

### Team Members
- Member 1: Roshny Johnson - RIT Kottayam
- Member 2: Gauri Lakshmi - RIT Kottayam

### Hosted Project Link
https://bus-tracker-e0905.web.app/

sample username:mrdriver@college.com
password:123456

### Project Description
This project is a real-time bus tracking system(now implemented for schools and colleges) that allows drivers to update their bus location using GPS and enables the user to view live bus locations with respect to their current location.

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

![Architecture Diagram]![Architecture diagram](https://github.com/user-attachments/assets/371c52cf-cacf-427c-8299-e75ef94a4463)

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

Base URL: https://bus-tracker-e0905-default-rtdb.asia-southeast1.firebasedatabase.app

Real-time Endpoints (Firebase Paths)
PATH: /buses/{busId}
Description: Updates or retrieves the live geographic coordinates and tracking status of a specific bus.

WRITE (Driver Side):

Method: Firebase set()

Request Body:

JSON
{
  "lat": 9.57500,
  "lng": 76.61900,
  "timestamp": 1707912345678,
  "driverId": "user_uid_123"
}
READ (Student Side):

Method: Firebase onValue() (WebSocket Stream)

Response:

JSON
{
  "lat": 9.57500,
  "lng": 76.61900,
  "timestamp": 1707912345678,
  "driverId": "user_uid_123"
}
PATH: /drivers/{uid}
Description: Associates a logged-in driver with a specific bus ID to begin tracking.

WRITE (Driver Side):

Method: Firebase set()

Request Body:

JSON
{
  "busId": "bus1",
  "email": "driver@college.com"
}
PATH: /users/{uid}
Description: Stores user profile information and access roles upon registration.

WRITE (Authentication Flow):

Method: Firebase set()

Request Body:

JSON
{
  "email": "user@college.com",
  "role": "driver"
}


---

#





## Project Demo

### Video
https://drive.google.com/file/d/148BPW4OxbS0eTZufSNvoSZqanheVHu_G/view?usp=sharing

This video shows the working of the Application where the Driver logs in and location is securely shared.

https://drive.google.com/file/d/1JJV3bBNXdfBaeEi_5nES6yexSicde83H/view?usp=sharing

This video depicts the home page where the we can track and compare the location of the required college bus with ourselves.
As you can see the college bus is tracked and shown (as the map pin icon )compared to the blue circle which depicts the location of the user.


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
